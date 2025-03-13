import animeList from "@/anime_data/anime_data";
import AnimeEpList from "@/app-ui/AnimeEpList";
import StreamingContainer from "@/app-ui/StreamingContainer";
import { fetchEpisode } from "@/services/services";

const Stream = async (props) => {
  const params = await props.searchParams;
  const animeId = Number(params.id);
  const cat = params.cat;
  const episode = Number(params.ep);

  const anime = animeList.find((anime) => anime._id === animeId);

  return (
    <div className="x-container py-12 flex flex-col  gap-4">
      <div className="">
        <StreamingContainer anime={anime} episode={episode} cat={cat} />
        <AnimeEpList selectedEpisode={episode} data={anime} />
      </div>
    </div>
  );
};

export default Stream;
