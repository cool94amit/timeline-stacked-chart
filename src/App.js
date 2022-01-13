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

  const groups = [{ id: 0, title: '' }, { id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]
  let timeBar = 0;
  console.log(timeBar)
  const calculatePercentage = () => {

  }

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
      itemProps: {
        onDoubleClick: () => { console.log('You clicked double!') },
        style: {
          background: 'fuchsia'
        }
      }
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


  const itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {

    console.log(item.background)

    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const background = itemContext.selected ? (itemContext.dragging ? "red" : "blue") : item && item.background ? `${item.background[0]}""` : "grey";
    const borderColor = itemContext.resizing ? "red" : "yellow";
    const netVal = (timeBar - itemContext.dimensions.left) - 4;
    const lftPercent = (netVal * 100) / itemContext.dimensions.width;
    console.log(lftPercent)

    return (
      <div
        {...getItemProps({
          style: {
            // background,
            color: "white",
            borderColor,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 4,
            borderLeftWidth: itemContext.selected ? 3 : 1,
            borderRightWidth: itemContext.selected ? 3 : 1
          },
          onMouseDown: () => {
            console.log("on item click", item);
          }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          <div 
          style={{
            width: `${lftPercent}%`,
            display: "inline-block",
            height: "100%",
            position: "relative",
            background: `${item.background[0]}`
          }}
        ></div>
          <div 
          style={{
            width: `${100 - lftPercent}%`,
            display: "inline-block",
            height: "100%",
            position: "relative",
            background: `${item.background[1]}`
          }}></div>
          <div 
          style={{
            display: "inline-block",
            position: "absolute",
            left: "0",
            color: "black",
            width: "100%",
            textAlign: "center",
          }}
          >{itemContext.title}</div>
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
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
          {/* <DateHeader unit="primaryHeader" /> */}
          <DateHeader
            unit={"month"}
            labelFormat={"DD MMM yyyy"}
            className={"dateLabel"}
          />
          <CursorMarker />
          {/* <CursorMarker>
            {({ styles, date }) => {
              const customStyle3s = {
                ...styles,
                backgroundColor: "deeppink",
                width: "4px"
              };
              return (
                <div style={customStyle3s}>
                  <div
                    style={{
                      // position: "fixed",
                      // left: 100,
                      // bottom: 50,
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: 10,
                      width: 100,
                      fontSize: 20,
                      borderRadius: 5,
                      zIndex: 85
                    }}
                  >
                    <moment interval={30000}>1976-04-19T12:59-0500</moment>
                  </div>
                </div>
              );
            }}
          </CursorMarker> */}
        </TimelineHeaders>
        <TimelineMarkers>
          <CustomMarker date={today} />
          <CustomMarker date={today}>
            {/* custom renderer for this marker */}
            {(ele) => {
              timeBar = ele.styles.left;
              const customStyles = {
                ...ele.styles,
                backgroundColor: "deeppink",
                width: "4px",
                zIndex: "999"
              };
              return (
                <div style={customStyles}>
                  {/* <div
                    style={{
                      // position: "fixed",
                      // left: 100,
                      // bottom: 50,
                      background: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: 10,
                      width: 180,
                      fontSize: 20,
                      borderRadius: 5,
                      zIndex: 85
                    }}
                  >
                    <moment interval={30}>{today}</moment>
                  </div> */}
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
