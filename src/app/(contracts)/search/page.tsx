"use client";

import React, { useRef, useState } from "react";
import CustomSelect from "@/components/common/MultiSelect";
import Icons from "@/components/common/Icons";
import { Button } from "@/components/common/Button";
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LIST_SAMPLE_QUESTIONS } from "./constant";
import { isLink } from "../../../../public/utils/checkURL";

const allSources = ["uscode", "doj_guidance", "us_bills"];
const DEBOUNCE_THRESHOLD = 1000;

const Search = () => {
  const timeoutHandler = useRef<any>(null);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<any>("");
  const [searchHints, setSearchHints] = useState<any[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.BaseSyntheticEvent | SelectChangeEvent) => {
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
      setSearchResult(result);
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
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(searchHints?.length / 5);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const startIndex = currentPage * 5;
  const endIndex = startIndex + 5;
  const displayedData = searchHints?.slice(startIndex, endIndex);
  return (
    <div className="bg-[#fff] rounded-xl p-10">
      <div className="grid text-lg">
        <div className="text-center divide-y-2">
          <div className="font-normal text-2xl p-4">Legal Search</div>
          <div className="text-left py-4">
            Please ask a question below below and get the result in real-time.
            Important phrases are denoted in{" "}
            <span className="font-bold">boldface</span>
          </div>
        </div>
        <div className="grid grid-cols-[0.2fr_1fr_55px] pt-4">
          <FormControl size="small">
            <Select
              value={""}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">Examples</MenuItem>
              {LIST_SAMPLE_QUESTIONS?.map((item) => (
                <MenuItem
                  value={item}
                  className="text-wrap"
                  key={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            {search && searchHints.length ? displayedData?.length : 0} Result
          </div>
          <CustomSelect
            options={allSources}
            selected={sources}
            handleSelect={handleSource}
          />
        </div>
        {loading && search && (
          <div className="grid place-content-center">
            <CircularProgress sx={{ color: "#00D3AF" }} />
          </div>
        )}
        {!loading && search && (
          <p
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: searchResult?.html }}
          ></p>
        )}
        <div className="block text-lg overflow-y-auto max-h-[1000px]">
          {!loading &&
            search &&
            displayedData?.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full flex flex-col p-4 border-[1px] border-slate-400 hover:bg-blue-200"
              >
                {isLink(item?.title) ? (
                  <a
                    className="font-semibold"
                    href={item?.title}
                    target="_blank"
                  >
                    {item?.title}
                  </a>
                ) : (
                  <div className="font-semibold">{item?.title}</div>
                )}
                <p>
                  <span dangerouslySetInnerHTML={{ __html: item?.context }} />
                </p>
              </div>
            ))}
        </div>
        {!loading && search && searchHints?.length && (
          <div className="flex gap-4 mt-5">
            <Button
              onClick={prevPage}
              disabled={currentPage === 0}
              variant="contained"
              className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[15%]"
            >
              Prev
            </Button>
            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              variant="contained"
              className="bg-[#00D3AF] hover:bg-[#00D3AF] w-[15%]"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
