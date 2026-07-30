import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "@/lib/axiosinstance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SearchResult = ({ query }: any) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (!query.trim()) {
          setVideos([]);
          return;
        }

        const res = await axiosInstance.get(
          `/video/search?q=${encodeURIComponent(query)}`
        );

        setVideos(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        Enter a search term.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        Loading...
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">
          No results found
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {videos.map((video) => (
        <div key={video._id} className="flex gap-4 group">
          <Link href={`/watch/${video._id}`}>
            <div className="relative w-80 aspect-video rounded-lg overflow-hidden bg-gray-100">
              <video
                src={`http://localhost:5000/${video.filepath}`}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          <div className="flex-1">
            <Link href={`/watch/${video._id}`}>
              <h2 className="text-lg font-semibold">
                {video.videotitle}
              </h2>
            </Link>

            <div className="text-sm text-gray-600 flex gap-2">
              <span>{video.views} views</span>
              <span>•</span>
              <span>
                {formatDistanceToNow(
                  new Date(video.createdAt)
                )}{" "}
                ago
              </span>
            </div>

            <Link
              href={`/channel/${video.uploader}`}
              className="flex items-center gap-2 mt-2"
            >
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  {video.videochanel?.[0]}
                </AvatarFallback>
              </Avatar>

              <span>{video.videochanel}</span>
            </Link>
          </div>
        </div>
      ))}

      <div className="text-center text-gray-600">
        Showing {videos.length} result(s)
      </div>
    </div>
  );
};

export default SearchResult;