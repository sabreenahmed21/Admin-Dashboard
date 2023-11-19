/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "Components/Header";
import { useGetProductsQuery } from "Services/JsonServerApi";
import { useState } from "react";

export const Product = ({
  category,
  description,
  name,
  price,
  rating,
  state,
  supply,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.4rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[200]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography color={theme.palette.secondary[300]} sx={{ mb: "1.5rem" }}>
          {Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.neutral[200]}
          gutterBottom
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "block" }}>
        <Button
          size="small"
          variant="primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
            width: "100%",
          }}
        >
          <CardContent>
            <Typography>Supply Left : {supply}</Typography>
            <Typography>
              Yearly Sales This Year : {state.map((s) => s.yearlySalesTotal)}
            </Typography>
            <Typography>
              Yearly Sales Units This Year :{" "}
              {state.map((s) => s.yearlyTotalSoldUnits)}
            </Typography>
          </CardContent>
        </Collapse>
      </CardActions>
    </Card>
  );
};
export default function Products() {
  const { data, isLoading, error, isError } = useGetProductsQuery();
  if (isError) {
    return <div>Error: {error.status}</div>;
  }

  return (
    <Box m="1rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))"
          rowGap="1rem"
          columnGap="1rem"
        >
          {data?.data.product.map(
            ({
              _id,
              category,
              description,
              name,
              price,
              rating,
              state,
              supply,
            }) => (
              <Product
                key={_id}
                category={category}
                description={description}
                name={name}
                price={price}
                rating={rating}
                state={state}
                supply={supply}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
}
