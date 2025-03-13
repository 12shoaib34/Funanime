"use client";

import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import VideoAreaActions from "./VideoAreaActions";
import SeekBar from "./SeekBar";
import Hls from "hls.js";
import Controls from "./Controls";
import CustomSubtitles from "./CustomSubtitles";

const XPlayerV2 = ({ url, captions = [], trackThumbnails = [], onComplete }) => {
  const playerRef = useRef(null);
  const hlsRef = useRef(null);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  const [isBuffering, setIsBuffering] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState({});
  const [isInactive, setIsInactive] = useState(false);

  const [settings, setSettings] = useState({
    isMuted: false,
    isPlaying: true,
    fullscreen: false,
    volume: 1,
    playbackRate: 1,
    selectedQuality: -1,
    caption: captions?.[0] || {},
  });

  const [qualityLevels, setQualityLevels] = useState([]);

  useEffect(() => {
    if (Hls.isSupported() && url) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const levels = hls.levels.map((level, index) => ({
          index,
          resolution: `${level.height}p`,
          bitrate: level.bitrate,
        }));
        setQualityLevels([{ index: -1, resolution: "Auto" }, ...levels]);
      });

      hlsRef.current = hls;

      return () => {
        hls.destroy();
      };
    }
  }, [url]);

  useEffect(() => {
    if (!settings?.fullscreen) return;

    const resetTimer = () => {
      setIsInactive(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsInactive(true), 5000);
    };

    const handleUserActivity = () => {
      resetTimer();
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleUserActivity);
      containerRef.current.addEventListener("keydown", handleUserActivity);
    }

    resetTimer();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleUserActivity);
        containerRef.current.removeEventListener("keydown", handleUserActivity);
      }
      clearTimeout(timeoutRef.current);
    };
  }, [settings?.fullscreen]);

  return (
    <div
      id="XPlayer"
      ref={containerRef}
      className={`w-full h-full relative bg-bg-secondary group ${isInactive ? "cursor-none" : "cursor-auto"}`}
    >
      <div className="w-full h-full relative">
        <VideoAreaActions
          progress={progress}
          isBuffering={isBuffering}
          settings={settings}
          playerRef={playerRef}
          setSettings={setSettings}
          onComplete={onComplete}
        />
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={settings.isPlaying}
          muted={settings.isMuted}
          volume={settings.volume}
          playbackRate={settings.playbackRate}
          onDuration={setDuration}
          onProgress={setProgress}
          onEnded={onComplete}
          onBuffer={() => setIsBuffering(true)}
          onBufferEnd={() => setIsBuffering(false)}
          controls={false}
          width="100%"
          height="100%"
          config={{
            file: {
              forceHLS: true,
            },
          }}
          playsinline
        />
        {playerRef.current && (
          <CustomSubtitles subtitleUrl={settings.caption?.file || captions?.[0]?.file || ""} playerRef={playerRef} />
        )}
      </div>

      <div
        className={`absolute bottom-6 left-24 right-24 bg-white/[10%] shadow-lg backdrop-blur-lg z-10 py-2 px-4 rounded-2xl duration-200 ${
          !isInactive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <Controls
          duration={duration}
          setSettings={setSettings}
          playerRef={playerRef}
          settings={settings}
          progress={progress}
          captions={captions}
          qualityLevels={qualityLevels}
        />
        <SeekBar trackThumbnails={trackThumbnails} playerRef={playerRef} progress={progress} />
      </div>
    </div>
  );
};

export default XPlayerV2;
