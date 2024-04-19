"use client";

import React, { useRef, useState } from "react";
import CustomSelect from "@/components/common/MultiSelect";
import Icons from "@/components/common/Icons";

const allSources = ["Wikipedia", "Bing", "Ecosia"];
const DEBOUNCE_THRESHOLD = 3000;

const Search = () => {
  const timeoutHandler = useRef<any>(null);
  const [search, setSearch] = useState<string>("");
  const [searchHints, setSearchHints] = useState<any[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const value = e.target.value;
    setSearch(value);
    setLoading(true);

    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current);
    }
    timeoutHandler.current = setTimeout(() => {
      searchReply(value);
    }, DEBOUNCE_THRESHOLD);
  };

  const searchReply = async (
    text: string,
    source?: string[],
    optionChange?: boolean
  ) => {
    try {
      let src = optionChange ? source : sources;
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({
          query: text,
          sources: src,
        }),
      });

      const result = await response.json();
      const modifiedHints = modifyData(result?.ret ?? []);
      setSearchHints(modifiedHints);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const modifyData = (data: any[]) => {
    return data.map((item) => ({
      ...item,
      context: boldTextBetweenPositions(
        item.context,
        item.start_pos,
        item.end_pos
      ),
    }));
  };

  function boldTextBetweenPositions(
    text: string,
    startPos: number,
    endPos: number
  ) {
    if (startPos >= 0 && endPos >= startPos && endPos <= text.length) {
      return (
        text.substring(0, startPos) +
        "<strong>" +
        text.substring(startPos, endPos + 1) +
        "</strong>" +
        text.substring(endPos + 1)
      );
    } else {
      console.error("Invalid start and end positions for text:", text);
      return text;
    }
  }

  const handleSource = (data: string[]) => {
    setSources(data);
    search && setLoading(true);
    search && searchReply(search, data, true);
  };

  return (
    <>
      <div className="container m-auto text-lg">
        <div className="text-center divide-y-2">
          <div className="font-normal text-2xl p-4">Wiki Search</div>
          <div className="text-left py-4">
            You can type in any natural language question below and get the
            result in real-time. Important phase are denoted in{" "}
            <span className=" font-bold">boldface</span>
          </div>
        </div>
        <div className="flex pt-4">
          <input
            value={search}
            onChange={handleChange}
            type="search"
            className="p-1 px-4 border-2 rounded-s-md border-e-0 w-full focus:outline-none"
          />
          <div
            onClick={() => {
              setLoading(true);
              searchReply(search);
            }}
            className="p-1 flex items-center px-3 bg-slate-500 rounded-e-md "
          >
            <Icons.searchIcon
              sx={{
                height: "30px",
                width: "30px",
                padding: "4px",
                color: "#fff",
              }}
            />
          </div>
        </div>
        <div className="flex justify-between items-center py-2">
          <div className="text-slate-400">
            {search && searchHints.length ? searchHints.length : 0} Result
          </div>
          <CustomSelect
            options={allSources}
            selected={sources}
            handleSelect={handleSource}
          />
        </div>
        <div>{loading && search && "Loading..."}</div>
        <div className="block text-lg">
          {!loading &&
            search &&
            searchHints.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full flex flex-col p-4 border-[1px] border-slate-400 hover:bg-blue-200"
              >
                <div>{item.title}</div>
                <p>
                  <span dangerouslySetInnerHTML={{ __html: item.context }} />
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;
