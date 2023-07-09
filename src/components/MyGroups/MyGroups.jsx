import { Box, Skeleton, Typography } from "@mui/material";

import { TextEmphasis } from "../TextEmphasis";
import { GroupItem } from "./GroupItem/GroupItem";
import { GroupsForm } from "./Form/GroupsForm";

import { useGroupsByPeriodData } from "../../hooks/useGroupsData";

export const MyGroups = () => {
  const { groups, total, isLoading, fetchGroups } = useGroupsByPeriodData();

  const addedGroupCallback = () => fetchGroups();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {total === 0 && (
        <Typography variant="body1">
          Llena este formulario para crear tu primer{" "}
          <TextEmphasis>grupo</TextEmphasis>:
        </Typography>
      )}
      {isLoading && <GroupsSkeleton />}
      {total !== 0 &&
        groups.map((group, index) => (
          <GroupItem key={group.uid} group={group} index={index + 1} />
        ))}
      <GroupsForm total={total} onAddGroup={addedGroupCallback} />
    </Box>
  );
};

const GroupsSkeleton = ({ length = 5 }) => {
  return Array.from(Array(length).keys()).map((i) => (
    <Skeleton
      key={i}
      animation="pulse"
      variant="rounded"
      sx={{
        mx: "auto",
        borderRadius: "12px",
        animationDelay: `${i * 0.08}s`,
        animationDuration: "1s",
      }}
      width="100%"
      height={40}
    />
  ));
};
