"use client";

import moment from "moment";
import { useState } from "react";
import { MdForward10, MdFullscreen, MdFullscreenExit, MdReplay10 } from "react-icons/md";
import XButton from "./XButton";

import {
  IoPauseOutline,
  IoPlayOutline,
  IoSettingsOutline,
  IoVolumeHigh,
  IoVolumeMute,
  IoForward10,
} from "react-icons/io5";
import { PiSubtitlesThin } from "react-icons/pi";
import { HiMiniSignal } from "react-icons/hi2";
import { TbClockCog, TbRewindForward10, TbRewindBackward10 } from "react-icons/tb";
import { BsFullscreenExit, BsFullscreen } from "react-icons/bs";
import VolSlider from "./VolSlider";

const Controls = (props) => {
  const { playerRef, settings, setSettings, progress, qualityLevels = [], captions = [], duration } = props;

  const [currentTab, setCurrentTab] = useState("QUALITY");
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettingOpen = () => {
    setIsOpen(!isOpen);
  };

  const togglePlay = () => {
    setSettings({ ...settings, isPlaying: !settings.isPlaying });
  };

  const toggleMute = () => {
    setSettings({ ...settings, isMuted: !settings.isMuted });
  };

  const toggleFullscreen = () => {
    let XPlayer = document.getElementById("XPlayer");

    if (!document.fullscreenElement) {
      XPlayer.requestFullscreen();
      setSettings((prev) => ({ ...prev, fullscreen: true }));
    } else {
      document.exitFullscreen();
      setSettings((prev) => ({ ...prev, fullscreen: false }));
    }
  };

  const onForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(progress.playedSeconds + 10, "seconds");
    }
  };

  const onRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(Math.max(progress.playedSeconds - 10, 0), "seconds");
    }
  };

  const onPlayBackRateChange = (speed) => {
    setSettings({ ...settings, playbackRate: speed });
    toggleSettingOpen();
  };

  const onQualityUpdate = (quality) => {
    const selectedIndex = quality.index;

    const internalPlayer = playerRef.current?.getInternalPlayer("hls");
    if (internalPlayer) {
      internalPlayer.currentLevel = selectedIndex;
    }

    setSettings((prev) => ({
      ...prev,
      selectedQuality: selectedIndex,
    }));

    toggleSettingOpen();
  };

  const onCaptionChange = (caption) => {
    setSettings((prev) => ({ ...prev, caption }));
    toggleSettingOpen();
    // if (playerRef?.current) {
    //   const video = playerRef.current.getInternalPlayer(); // Get the native video element

    //   if (video) {
    //     // Remove existing subtitle tracks
    //     const existingTracks = video.querySelectorAll("track");
    //     existingTracks.forEach((track) => track.remove());
    //     // Create a new track element
    //     const track = document.createElement("track");
    //     track.kind = "captions";
    //     track.label = caption.label;
    //     track.srclang = "en"; // Adjust based on the caption language
    //     track.src = caption.file;
    //     track.default = caption.default || false;

    //     // Append the new track to the video element
    //     video.appendChild(track);
    //   }
    // }
  };

  const formateTime = (seconds) => {
    if (!seconds) return "00:00";

    return moment.utc(seconds * 1000).format("mm:ss");
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <XButton className="relative" onClick={togglePlay}>
          <IoPauseOutline
            size={26}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 duration-300 -translate-y-1/2 ${
              settings.isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
          <IoPlayOutline
            size={26}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 duration-300 -translate-y-1/2 ${
              !settings.isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        </XButton>

        <VolSlider settings={settings} setSettings={setSettings} playerRef={playerRef} />
        <XButton className="relative" onClick={toggleMute}>
          <IoVolumeMute
            size={26}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 duration-300 -translate-y-1/2 ${
              settings.isMuted ? "opacity-100" : "opacity-0"
            }`}
          />

          <IoVolumeHigh
            size={26}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 duration-300 -translate-y-1/2 ${
              !settings.isMuted ? "opacity-100" : "opacity-0"
            }`}
          />
        </XButton>

        <span className="block text-white ml-2 text-xs leading-none">
          {formateTime(progress.playedSeconds)} / {formateTime(duration)}
        </span>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <XButton className="group" onClick={toggleSettingOpen}>
            <IoSettingsOutline size={22} />
          </XButton>
          <div
            className={`min-w-[300px] min-h-[250px] absolute -translate-y-full -translate-x-full top-0 left-10 p-2 bg-bg-secondary rounded-2xl ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex items-center border-b mb-2 pb-2">
              <XButton active={currentTab === "SUBTITLES"} onClick={() => setCurrentTab("SUBTITLES")}>
                <PiSubtitlesThin size={28} />
              </XButton>
              <XButton active={currentTab === "QUALITY"} onClick={() => setCurrentTab("QUALITY")}>
                <HiMiniSignal size={28} />
              </XButton>
              <XButton active={currentTab === "PLAYBACK_SPEED"} onClick={() => setCurrentTab("PLAYBACK_SPEED")}>
                <TbClockCog size={28} />
              </XButton>
            </div>
            {currentTab === "SUBTITLES" && captions?.length > 0 && (
              <div className="flex flex-col max-h-[250px] overflow-auto hide-scrollbar">
                {captions.map((caption, index) => (
                  <button
                    onClick={() => onCaptionChange(caption)}
                    className={`cursor-pointer text-left hover:bg-bg-tertiary py-2 px-4 rounded-2xl ${
                      settings.caption.label === caption.label ? "bg-bg-tertiary" : ""
                    }`}
                    key={index}
                  >
                    {caption.label}
                    {settings.caption.label === caption.label && " ✓"}
                  </button>
                ))}
              </div>
            )}
            {currentTab === "QUALITY" && qualityLevels?.length > 0 && (
              <div className="flex flex-col max-h-[250px] overflow-auto hide-scrollbar">
                {qualityLevels.map((quality, index) => (
                  <button
                    onClick={() => onQualityUpdate(quality)}
                    className={`cursor-pointer text-left hover:bg-bg-tertiary py-2 px-4 rounded-2xl ${
                      settings.selectedQuality === quality.index ? "bg-bg-tertiary" : ""
                    }`}
                    key={index}
                  >
                    {quality.resolution}
                    {settings.selectedQuality === quality.index && " ✓"}
                  </button>
                ))}
              </div>
            )}
            {currentTab === "PLAYBACK_SPEED" && (
              <div className="flex flex-col max-h-[250px] overflow-auto hide-scrollbar">
                {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed, index) => (
                  <button
                    onClick={() => onPlayBackRateChange(speed)}
                    className={`cursor-pointer text-left hover:bg-bg-tertiary py-2 px-4 rounded-2xl ${
                      settings.playbackRate === speed ? "bg-bg-tertiary" : ""
                    }`}
                    key={index}
                  >
                    {speed}x{settings.playbackRate === speed && " ✓"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <XButton className="group" onClick={onRewind}>
          {<TbRewindBackward10 size={26} />}
        </XButton>
        <XButton className="group" onClick={onForward}>
          {<TbRewindForward10 size={26} />}
        </XButton>
        <XButton className="group" onClick={toggleFullscreen}>
          {settings?.fullscreen ? <BsFullscreenExit size={26} /> : <BsFullscreen size={18} />}
        </XButton>
      </div>
    </div>
  );
};

export default Controls;
