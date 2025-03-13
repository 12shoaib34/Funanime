"use client";

import React, { useState, useEffect } from "react";
import Select from "./Select";
import Heading from "./Heading";

const AnimeEpList = ({ data, selectedEpisode }) => {
  const total = data?.totalEpisodes || 0;
  const episodes = Array.from({ length: total }, (_, index) => index + 1);

  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const progress = JSON.parse(localStorage.getItem("progress")) || [];
      setProgress(progress);
    }
  }, []);

  const episodeGroups = episodes.reduce((acc, episode) => {
    const groupIndex = Math.floor((episode - 1) / 50);
    if (!acc[groupIndex]) {
      acc[groupIndex] = {
        index: groupIndex,
        label: `${groupIndex * 50 + 1} - ${Math.min((groupIndex + 1) * 50, total)}`,
        episodes: [],
      };
    }
    acc[groupIndex].episodes.push(episode);
    return acc;
  }, []);

  const getSelectedGroupIndex = () => {
    if (!selectedEpisode) return 0;
    return episodeGroups.findIndex((group) => group.episodes.includes(selectedEpisode)) || 0;
  };

  const [selectedIndex, setSelectedIndex] = useState(getSelectedGroupIndex);

  useEffect(() => {
    setSelectedIndex(getSelectedGroupIndex);
  }, [selectedEpisode]);

  const handleEpisodeClick = (episode) => {
    const cat = data?.cat?.includes("dub") ? "dub" : "sub";
    const url = `/stream?id=${data._id}&ep=${episode}&cat=${cat}`;

    let currentAnime = progress?.find((anime) => anime._id === data._id) || {};
    if (currentAnime?._id) {
      currentAnime.continueUrl = url;
    } else {
      currentAnime = { _id: data._id, continueUrl: url };
    }

    const updateProgress = [...progress.filter((anime) => anime._id !== data._id), currentAnime];
    localStorage.setItem("progress", JSON.stringify(updateProgress));

    window.location.href = url;
  };

  const progressUrl = progress?.find((anime) => anime._id === data._id)?.continueUrl;

  const onSelect = (e) => {
    setSelectedIndex(e.index);
  };

  return (
    <div className="mt-6">
      {/* <div className="mb-4">
        <Select
          placeholder="Select a group"
          onSelect={onSelect}
          options={episodeGroups}
          valuePropName="index"
          selectedValue={selectedIndex}
        />
      </div> */}

      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Heading variant={3}>List of groups</Heading>
          <div className="">
            {progressUrl && !progressUrl?.includes(`${selectedEpisode}`) && (
              <button onClick={() => (window.location.href = progressUrl)} className="btn btn-primary btn-xs w-full">
                Continue
              </button>
            )}
          </div>
        </div>

        {episodeGroups.length > 1 && (
          <div className="flex items-center overflow-auto hide-scrollbar">
            {episodeGroups.map((group, index) => (
              <button
                key={group.index}
                className={`btn py-2 text-nowrap  mr-4 mb-4 px-6 rounded-lg font-light inline-block ${
                  selectedIndex === index ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => onSelect({ index })}
              >
                {group.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Heading variant={3}>List of episodes</Heading>
          <div className="flex items-center">
            <span className="text-sm mr-2 text-foreground-secondary">Ep: {selectedEpisode}</span>
          </div>
        </div>

        <div>
          <div className="inline-block">
            {episodeGroups[selectedIndex]?.episodes.map((ep) => (
              <button
                key={ep}
                className={`btn py-2 mr-4 mb-4 px-6 rounded-lg font-light inline-block ${
                  selectedEpisode === ep ? "btn-primary" : "btn-secondary"
                } ${data?.filers?.includes(ep) ? "opacity-50 line-through" : ""}`}
                onClick={() => handleEpisodeClick(ep)}
              >
                Ep {ep <= 9 ? 0 : ""}
                {ep}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeEpList;
