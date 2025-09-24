import Image from "next/image";

export default function AnimeCard({ anime }) {
  return (
    <div className="w-64 bg-[#2c2345] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
      <Image
        src={anime.img}
        alt={anime.title}
        width={256}
        height={360}
        className="object-cover"
      />
      <div className="p-4 text-left text-[#e0dff5]">
        <h3 className="font-bold text-lg">{anime.title}</h3>
        <p className="font-semibold">{anime.genre}</p>
        <p className="text-yellow-400 font-bold">⭐ {anime.rating}</p>
      </div>
    </div>
  );
}
