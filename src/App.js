import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import TimelineHeaders from 'react-calendar-timeline/lib/lib/headers/TimelineHeaders'
import SidebarHeader from 'react-calendar-timeline/lib/lib/headers/SidebarHeader'
import DateHeader from 'react-calendar-timeline/lib/lib/headers/DateHeader'
import CursorMarker from 'react-calendar-timeline/lib/lib/markers/public/CursorMarker'
import TimelineMarkers from 'react-calendar-timeline/lib/lib/markers/public/TimelineMarkers'
import CustomMarker from 'react-calendar-timeline/lib/lib/markers/public/CustomMarker'
import "./App.css"

function App() {

  let timeBar = 0;
  const grpHeight = 90;
  const groups = [
    { id: 0, title: '', height: 45 },
    { id: 1, title: 'group 1', height: grpHeight },
    { id: 2, title: 'group 2', height: grpHeight },
  ];
  const items = [
    {
      id: 0,
      groups: 0,
      title: '',
    },
    {
      id: 1,
      group: 1,
      title: 'Update',
      background: ["#9050E9", "#b187eb"],
      start_time: moment().add(-5, "d").startOf("day").valueOf(),
      end_time: moment().add(20, "d").startOf("day").valueOf(),
      className: "amit",
    },
    {
      id: 2,
      group: 2,
      title: 'item 2',
      background: ["#ff9823", "#feb65d"],
      start_time: moment().add(-5, "d").startOf("day").valueOf(),
      end_time: moment().add(0, "d").startOf("day").valueOf(),
    },
    {
      id: 3,
      group: 1,
      title: 'item 3',
      background: ["#007f70", "#c19ef0"],
      start_time: moment().add(25, "d").startOf("day").valueOf(),
      end_time: moment().add(30, "d").startOf("day").valueOf(),
    }
  ];

  const today = Date.now();
  const timeStart = moment().startOf("month");
  const timeEnd = moment().add(4, "M").endOf("month");


  const itemRenderer = ({ item, itemContext, getItemProps }) => {
    const netVal = (timeBar - itemContext.dimensions.left);
    let lftPercent = 0;
    if (netVal > 0) {
      lftPercent = (netVal * 100) / itemContext.dimensions.width;
    }
    const itemTopAccordingToPlugin = getItemProps({}).style.top;
    const topHeight = Math.round(itemTopAccordingToPlugin.split('px')[0]) + itemContext.dimensions.height

    const itemStyle = {
      ...getItemProps({ onMouseDown: () => { console.log("on item click", item); }, }),
      style: {
        ...getItemProps({ onMouseDown: () => { console.log("on item click", item); }, }).style,
        borderRadius: 4,
        border: "unset",
        top: `${topHeight}px`
      }
    }
    return (
      <div
        {...itemStyle}
      >
        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            borderRadius: "4px"
          }}
        >
          {(netVal > 0) &&
            [<div
              key={"leftDiv"}
              style={{
                width: `${lftPercent}%`,
                display: "inline-block",
                height: "100%",
                position: "relative",
                background: `${item.background[0]}`
              }}
            ></div>,
            <div
              key={"rightDiv"}
              style={{
                width: `${100 - lftPercent}%`,
                display: "inline-block",
                height: "100%",
                position: "relative",
                background: `${item.background[1]}`
              }}></div>]
          }
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              left: "0",
              color: "#fff",
              width: "100%",
              textAlign: "center",
            }}
          >{itemContext.title}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Timeline
        groups={groups}
        items={items}
        itemRenderer={itemRenderer}
        canMove={false}
        canResize={false}
        defaultTimeStart={timeStart}
        defaultTimeEnd={timeEnd}
        sidebarWidth={130}
        itemHeightRatio={1}
        stackItems={true}
        className={"App"}
        timeSteps={{
          day: 7
        }}
      >
        <TimelineHeaders
          className="sticky"
          calendarHeaderClassName={"scroll-header"}
        >
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div className='cal-title' {...getRootProps()}>Report</div>;
            }}
          </SidebarHeader>
          <DateHeader
            unit={"month"}
            labelFormat={"DD MMM yyyy"}
            className={"dateLabel"}
          />
          <CursorMarker />
        </TimelineHeaders>
        <TimelineMarkers>
          <CustomMarker date={today} />
          <CustomMarker date={today}>
            {(ele) => {
              timeBar = ele.styles.left;
              const customStyles = {
                ...ele.styles,
                backgroundColor: "deeppink",
                width: "2px",
                zIndex: "999",
              };
              return (
                <div style={customStyles}>
                  <div
                    style={{
                      background: "#fff",
                      color: "#000",
                      width: 75,
                      height: 30,
                      fontSize: 10,
                      borderRadius: 5,
                      zIndex: 85,
                      border: "1px solid",
                      overflow: "hidden",
                      textAlign: "center",
                      padding: "6px",
                      marginLeft: "-36px",
                      marginTop: "6px"
                    }}
                  >
                    {
                      new Date().toLocaleDateString("en-US", { month: 'short', year: 'numeric', day: 'numeric' })
                    }
                  </div>
                </div>
              );
            }}
          </CustomMarker>
        </TimelineMarkers>
      </Timeline>
    </>
  );
}

export default App;
