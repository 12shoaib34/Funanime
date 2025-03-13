import animeList from "@/anime_data/anime_data";
import AnimeEpList from "@/app-ui/AnimeEpList";
import Heading from "@/app-ui/Heading";
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

        <div className="mt-4 flex flex-col gap-4">
          <Heading variant={2}>{anime.anime}</Heading>

          <div className="flex items-center flex-wrap gap-2 text-foreground-secondary">
            {anime.genre?.split(",")?.map((item) => (
              <span key={item} className="bg-bg-secondary py-1 px-4 btn-xs rounded-full">
                {item}
              </span>
            ))}
          </div>
          {anime?.description && <p className="text-foreground-secondary">{anime?.description}</p>}
        </div>
      </div>
    </div>
  );
};

export default Stream;
