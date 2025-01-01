import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineItemProps,
  TimelineSeparator,
} from "@mui/lab";
import { Card, CardHeader, CardProps, Typography } from "@mui/material";
import { formatDateTime } from "../../utils/format-time";

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    type: string;
    title: string;
    time: string | number | null;
  }[];
};

export function AnalyticsOrderTimeline({
  title,
  subheader,
  list,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <Item
            key={item.id}
            item={item}
            lastItem={index === list.length - 1}
          />
        ))}
      </Timeline>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ItemProps = TimelineItemProps & {
  lastItem: boolean;
  item: Props["list"][number];
};

function Item({ item, lastItem, ...other }: ItemProps) {
  return (
    <TimelineItem {...other}>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item.type === "order1" && "primary") ||
            (item.type === "order2" && "success") ||
            (item.type === "order3" && "info") ||
            (item.type === "order4" && "warning") ||
            "error"
          }
        />
        {lastItem ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item.title}</Typography>

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {formatDateTime(item.time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
