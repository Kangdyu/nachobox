import React, { useEffect, useState } from "react";
import { movieApi, tvApi } from "../api/api";
import { CreditsInfo } from "../api/types";
import getImageURL from "../common/getImageURL";
import GridItem from "./GridItem";
import ScrollGridCategory from "./ScrollGridCategory";

type CreditsProps = {
  id: number;
  isMovie: boolean;
};

function Credits({ id, isMovie }: CreditsProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CreditsInfo>({ id, cast: [], crew: [] });

  useEffect(() => {
    async function fetchData() {
      let apiFunc;
      if (isMovie) {
        apiFunc = movieApi.credits;
      } else {
        apiFunc = tvApi.credits;
      }

      try {
        const { data: credits } = await apiFunc(id);

        setData(credits);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, isMovie]);

  if (loading) {
    return null;
  }

  return (
    <>
      {data.cast !== [] && (
        <ScrollGridCategory
          title="배우"
          columnWidth={200}
          gap={15}
          scrollRatio={2}
          listLength={data.cast.length}
        >
          {data.cast.map((person) => (
            <GridItem
              key={person.credit_id}
              title={person.name}
              subtitle={person.character}
              image={
                person.profile_path
                  ? getImageURL(person.profile_path, "w500")
                  : require("../assets/no-image.png")
              }
            />
          ))}
        </ScrollGridCategory>
      )}
      {data.crew !== [] && (
        <ScrollGridCategory
          title="제작진"
          columnWidth={200}
          gap={15}
          scrollRatio={2}
          listLength={data.crew.length}
        >
          {data.crew.map((person) => (
            <GridItem
              key={person.credit_id}
              title={person.name}
              subtitle={person.job}
              image={
                person.profile_path
                  ? getImageURL(person.profile_path, "w500")
                  : require("../assets/no-image.png")
              }
            />
          ))}
        </ScrollGridCategory>
      )}
    </>
  );
}

export default Credits;