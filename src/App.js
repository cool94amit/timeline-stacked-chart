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

function App() {

  const groups = [{ id: 0, title: '' }, { id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

  const items = [
    {
      id: 0,
      groups: 0,
      title: '',
    },
    {
      id: 1,
      group: 1,
      title: 'item 1',
      start_time: moment(),
      end_time: moment().add(1, 'hour'),
    },
    {
      id: 2,
      group: 2,
      title: 'item 2',
      start_time: moment().add(-0.5, 'hour'),
      end_time: moment().add(0.5, 'hour')
    },
    {
      id: 3,
      group: 1,
      title: 'item 3',
      start_time: moment().add(2, 'hour'),
      end_time: moment().add(3, 'hour')
    }
  ]

  const today = Date.now();
  const tomorrow = Date.now();

  return (
    <>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
        horizontalLineClassNamesForGroup={(group) => group.root ? ["amit"] : ["rai"]}
        sidebarWidth={120}
      >
        <TimelineHeaders className="sticky">
          <SidebarHeader>
            {({ getRootProps }) => {
              return <div {...getRootProps()}>Report</div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" />
          <DateHeader />
          <CursorMarker />
          <CursorMarker>
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
          </CursorMarker>
        </TimelineHeaders>
        <TimelineMarkers>
          <CustomMarker date={today} />
          <CustomMarker date={tomorrow}>
            {/* custom renderer for this marker */}
            {({ styles, date }) => {
              const customStyles = {
                ...styles,
                backgroundColor: "deeppink",
                width: "4px"
              };
              return (
                <div style={customStyles}>
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
          </CustomMarker>
        </TimelineMarkers>
      </Timeline>
    </>
  );
}

export default App;
