import React from "react";

import { CreditsInfo } from "api/types";

import { getPosterURL } from "utils/imageGetter";
import GridItem from "components/common/GridItem";
import ScrollGrid from "components/common/ScrollGrid";

type CreditsProps = {
  credits: CreditsInfo;
};

function Credits({ credits }: CreditsProps) {
  return (
    <>
      {credits.cast.length !== 0 && (
        <ScrollGrid title="배우" listLength={credits.cast.length}>
          {credits.cast.map((person) => (
            <GridItem
              key={person.credit_id}
              title={person.name}
              subtitle={person.character}
              image={
                person.profile_path
                  ? getPosterURL(person.profile_path, "w500")
                  : require("assets/no-image.png")
              }
            />
          ))}
        </ScrollGrid>
      )}
      {credits.crew.length !== 0 && (
        <ScrollGrid title="제작진" listLength={credits.crew.length}>
          {credits.crew.map((person) => (
            <GridItem
              key={person.credit_id}
              title={person.name}
              subtitle={person.job}
              image={
                person.profile_path
                  ? getPosterURL(person.profile_path, "w500")
                  : require("assets/no-image.png")
              }
            />
          ))}
        </ScrollGrid>
      )}
    </>
  );
}

export default Credits;
