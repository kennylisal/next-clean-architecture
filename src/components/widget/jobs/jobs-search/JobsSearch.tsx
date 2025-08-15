"use client";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { SearchOutlined } from "@mui/icons-material";

export const JobsSearch = ({
  handleSearch,
}: {
  handleSearch: (
    dateStart: string | undefined,
    dateEnd: string | undefined,
    search: string | undefined
  ) => void;
}) => {
  const [salary, setSalary] = useState<string>("20");
  const [location, setLocation] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const handleSalaryChange = useCallback((event: SelectChangeEvent<string>) => {
    setSalary(event.target.value as string);
  }, []);

  const handleLocationChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setLocation(event.target.value as string);
    },
    []
  );

  const onClick = () => {
    console.log(search);
    handleSearch(undefined, undefined, search);
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Stack direction={"row"} spacing={0.5} alignItems={"center"}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size={"medium"}
        fullWidth
        onChange={onSearchChange}
      />

      <FormControl fullWidth>
        <InputLabel id="location-select-label">Location</InputLabel>
        <Select
          labelId="location-select-label"
          id="location-select"
          value={location}
          label="Location"
          onChange={handleLocationChange}
          variant={"outlined"}
          // placeholder={'Location'}
        >
          <MenuItem value={"chicago"}>Chicago</MenuItem>
          <MenuItem value={"san-francisco"}>San Francisco</MenuItem>
          <MenuItem value={"new-york"}>New York</MenuItem>
        </Select>
      </FormControl>

      <IconButton size={"large"} color={"primary"} onClick={onClick}>
        <SearchOutlined />
      </IconButton>
    </Stack>
  );
};
