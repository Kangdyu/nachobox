import { ProductionCompany } from "api/types";
import GridItem from "components/common/GridItem";
import ScrollGrid from "components/common/ScrollGrid";
import React from "react";
import { getPosterURL } from "utils/imageGetter";

type ProductionCompaniesProps = {
  companies: ProductionCompany[];
};

function ProductionCompanies({ companies }: ProductionCompaniesProps) {
  return (
    <ScrollGrid title="제작사" listLength={companies.length}>
      {companies.map((company) => (
        <GridItem
          key={company.id}
          title={company.name}
          subtitle={company.origin_country}
          image={
            company.logo_path
              ? getPosterURL(company.logo_path, "w500")
              : require("assets/no-image.png")
          }
          heightRatio={0.4}
        />
      ))}
    </ScrollGrid>
  );
}

export default ProductionCompanies;
