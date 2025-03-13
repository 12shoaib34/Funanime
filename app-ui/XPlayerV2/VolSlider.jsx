"use client";

import React, { useState } from "react";

const VolSlider = (props) => {
  const { settings, setSettings, playerRef } = props;

  const [volume, setVolume] = useState(settings.volume);

  const onVolumeChange = (e) => {
    setVolume(e.target.value);
    setSettings((prev) => ({ ...prev, volume: e.target.value }));
    playerRef.current.volume = e.target.value;
  };

  return (
    <div
      role="slider"
      tabIndex={0}
      style={{
        clipPath: "polygon(100% 100%, 0% 100%, 100% 0)",
      }}
      className="relative overflow-hidden bg-black/20 w-16 h-4 cursor-pointer rounded-br-md select-none flex items-center justify-center mr-2"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-theme-primary" style={{ width: `${volume * 100}%` }} />
      <input
        className="opacity-0 w-full h-full absolute inset-0"
        step="0.01"
        value={volume}
        min="0"
        max="1"
        type="range"
        onChange={onVolumeChange}
      />
    </div>
  );
};

export default VolSlider;
