import {Button} from '@mui/material';
import {DatePicker,TimePicker} from '@mui/x-date-pickers';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {MUIButton} from '../../components/atoms';
import {sortTimeRanges,toHHMM} from '../../helpers';
import doesTimeRangeOverlap from '../../helpers/doesTimeRangeOverlap';
import {paths} from '../../paths';
import {useAppSelector} from '../../redux/hooks';
import {showModal} from '../../redux/slices/modalSlice';
import {updateCustomDailySchedule} from '../../redux/slices/providersSlice';
import {TimeRange} from '../../types';

const UpdateSpecificDatesPage = () => {
  const { currentProvider } = useAppSelector((state) => state.providers);

  const [timeRanges, setTimeRanges] = useState<TimeRange[] | null>(
    currentProvider?.defaultDailyHours || null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rangeInput, setRangeInput] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [changesMade, setChangesMade] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveTimeRange = (index: number) => {
    if (timeRanges) {
      const newTimeRanges = timeRanges.filter((_, i) => i !== index);
      setTimeRanges(newTimeRanges);
      setChangesMade(true);
    }
  };

  const handleAddNewTimeRange = () => {
    //ensure both start and end values are entered
    if (rangeInput.start && rangeInput.end) {
      if (rangeInput.start >= rangeInput.end) {
        dispatch(
          showModal({
            title: 'Hang On!',
            message:
              'The start time must be before the end time.  No overnight shifts at Henry Meds!',
            dismissText: 'Dismiss',
          }),
        );
        return;
      }

      const newTimeRange: TimeRange = {
        start: toHHMM(rangeInput.start),
        end: toHHMM(rangeInput.end),
      };

      if (doesTimeRangeOverlap(newTimeRange, timeRanges || [])) {
        dispatch(
          showModal({
            title: 'Hang On!',
            message:
              'This time range overlaps with an existing range. Please try again',
            dismissText: 'Dismiss',
          }),
        );
        return;
      }

      if (timeRanges) {
        const sortedTimeRanges = sortTimeRanges([...timeRanges, newTimeRange]);
        setTimeRanges(sortedTimeRanges);
      }

      setRangeInput({ start: null, end: null });

    } else {
      dispatch(
        showModal({
          title: 'Hang On!',
          message: 'You must enter both a start and end time',
          dismissText: 'Reset',
        }),
      );

      setChangesMade(false);

      return;
    }

    setChangesMade(true);
  };

  const handleDateSelected = (value: Date | null) => {

    if (!value) {
      return;
    }

    setSelectedDate(value)

    const dayValue = value?.getDay()
    const foundAppointmentSlot = currentProvider && currentProvider.customDailySchedules.find((schedule) => {
      const day = new Date(schedule.date).getDay()
      return day === dayValue
    })
    
    if (foundAppointmentSlot) {
      setTimeRanges(foundAppointmentSlot.availableHours)
    } else {
      setTimeRanges(currentProvider?.defaultDailyHours || null)
    }
  }

  const handleSave = () => {
    if (timeRanges && timeRanges.length > 0) {
      dispatch(updateCustomDailySchedule
        ({
          id: currentProvider?.id!,
          customDailySchedule: {
            date: selectedDate!.toLocaleDateString(),
            availableHours: timeRanges
          }
        }),
      );
      setChangesMade(false);
      dispatch(
        showModal({
          title: 'Success!',
          message: 'Your changes have been saved',
          dismissText: 'Dismiss',
        }),
      );
    } else {
      dispatch(
        showModal({
          title: 'Hang On!',
          message: 'You must enter at least one time range',
          dismissText: 'Reset',
        }),
      );
      setChangesMade(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <MUIButton
          variant='text'
          label='Back'
          onClick={() => navigate(paths.providerHome.route)}
        ></MUIButton>
      </div>
      <h1 style={{ marginBottom: '36px' }}>Update Specific Dates</h1>
      <div style={{display: 'flex', justifyContent: "flex-start", marginLeft: 16}}>
        <DatePicker label="Select a Date" value={selectedDate} onChange={(value) => handleDateSelected(value)} />
      </div>

      {selectedDate && <div
        style={{ display: 'flex', flexDirection: 'column', margin: '0 16px' }}
      >
        <h2
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          Enter a new Time Range
        </h2>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginBottom: '36px',
          }}
        >
          <TimePicker
            label='Start time'
            ampm={false}
            minutesStep={15}
            value={rangeInput.start}
            onChange={(newValue) =>
              setRangeInput({ ...rangeInput, start: newValue })
            }
          />
          <span style={{ margin: '0 16px' }}>-</span>
          <TimePicker
            label='End time'
            ampm={false}
            minutesStep={15}
            value={rangeInput.end}
            onChange={(newValue) =>
              setRangeInput({ ...rangeInput, end: newValue })
            }
          />
          <div style={{ width: 80 }}>
            <MUIButton label='Add' onClick={handleAddNewTimeRange}></MUIButton>
          </div>
        </div>

        <h2
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            margin: 0,
          }}
        >
          Current Availability Ranges
        </h2>
        <div>
          {timeRanges &&
            timeRanges.map((timeRange, index) => {
              return (
                <div
                  key={`Time Range ` + index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: '16px 8px 16px 0px',
                    height: 36,
                  }}
                >
                  <p>
                    {timeRange.start} - {timeRange.end}
                  </p>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleRemoveTimeRange(index)}
                  >
                    Remove Range
                  </Button>
                </div>
              );
            })}
        </div>
        <MUIButton
          label={'Save'}
          variant='contained'
          disabled={!changesMade}
          onClick={handleSave}
        />
      </div>}
    </>
  );
};

export default UpdateSpecificDatesPage;
