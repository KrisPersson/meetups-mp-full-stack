import "./MeetupsView.scss";
import Header from "../../components/Header/Header";
import { apiGetUpcomingMeetUps, apiGetSpecificMeetup } from "../../api/meetups";
// import meetupArr from "../../components/Meetups/Meetups";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MeetupFromDb } from "../../types/index";
import { MeetupListItem } from "../../components/MeetupListItem/MeetupListItem";
import { APP_URL } from "../../utils/index";
import { createFilterSelectOptions } from "../../utils/filterSelectOptions";

export default function MeetupsView() {
  const navigate = useNavigate();
  const [meetupItems, setMeetupItems] = useState<MeetupFromDb[]>([]);
  const [searchedItems, setSearchedItems] = useState<MeetupFromDb[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filter, setFilter] = useState({
    date: "",
    location: "",
    category: "",
  });

  useEffect(() => {
    fetchMeetups();
  }, []);

  async function fetchMeetups() {
    const token = localStorage.getItem("userToken") || "";
    const dataFromDb = await apiGetUpcomingMeetUps(token);
    setMeetupItems([...dataFromDb.meetups]);
  }

  function seeMeetup(meetup: MeetupFromDb) {
    return function () {
      navigate(APP_URL + "detail", {
        state: { meetupId: meetup.SK },
      });
    };
  }

  function handleClick() {
    console.log("test");
  }

  function searchMeetups(value: string) {
    const filtered = meetupItems.filter((meetup) => {
      const desc = meetup.Description.toLowerCase();
      const title = meetup.Title.toLowerCase();
      return (
        desc.includes(value.toLowerCase()) ||
        title.includes(value.toLowerCase())
      );
    });
    setSearchedItems([...filtered]);
  }

  function handleSearchInputChange(value: string) {
    setSearchInput(value);
    searchMeetups(value);
  }

  function handleFilterChange(
    target: EventTarget & { name: string; value: string }
  ) {
    setFilter((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  }

  function handleClearFilter() {
    setFilter({
      date: "",
      location: "",
      category: "",
    });
    document.querySelector(".select-category").selectedIndex = 0;
    document.querySelector(".select-location").selectedIndex = 0;
    document.querySelector(".select-date").valueAsNumber = NaN;
  }

  function isFilterFullyOff() {
    for (const key in filter) {
      if (filter[key] !== "") return false;
    }
    return true;
  }

  const renderedMeetupItems = () => {
    let toBeRendered =
      searchInput.length > 0
        ? [...searchedItems]
        : meetupItems.length > 0
          ? [...meetupItems]
          : [];

    if (!isFilterFullyOff()) {
      if (filter.date) {
        toBeRendered = toBeRendered.filter((item) => {
          const dbDate = new Date(item.StartTime);
          const pickedDate = new Date(filter.date);
          return (
            dbDate.toLocaleString().slice(0, 9) ===
            pickedDate.toLocaleString().slice(0, 9)
          );
        });
      }
      if (filter.location) {
        toBeRendered = toBeRendered.filter((item) => {
          return (
            item.Location.toLowerCase().trim() ===
            filter.location.toLowerCase().trim()
          );
        });
      }
      if (filter.category) {
        toBeRendered = toBeRendered.filter((item) => {
          return (
            item.Category?.toLowerCase().trim() ===
            filter.category.toLowerCase().trim()
          );
        });
      }
    }

    return toBeRendered.length > 0 ? (
      toBeRendered.map((meetup) => (
        <MeetupListItem
          key={meetup.PK}
          {...meetup}
          seeMeetup={seeMeetup(meetup)}
        />
      ))
    ) : isFilterFullyOff() && !searchInput ? (
      <p>No scheduled upcoming meetups</p>
    ) : (
      <p>Custom search/filter returned no upcoming meetups</p>
    );
  };

  return (
    <div className="view meetups-view">
      <Header showHomeBtn={false} showMyPageBtn={true} onClick={null} />
      <section className="meetups-container">
        <h1 className="meetup-h1">MeetApp</h1>
        <div className="meetups-container__search-container">
          <input
            type="text"
            defaultValue={searchInput}
            placeholder="Search Meetups..."
            onChange={(e) => handleSearchInputChange(e.target?.value)}
          />
        </div>
        <hr />
        <h3 className="filter-by">Filter by:</h3>
        <section className="meetups-container__filter-container">
          {!isFilterFullyOff() && (
            <span onClick={handleClearFilter} className="clear-filter">
              Clear filter
            </span>
          )}
          <label className="filter-container__label">
            Date
            <input
              className="select-date"
              type="date"
              name="date"
              onChange={(e) => handleFilterChange(e.target)}
            />
          </label>
          <label className="filter-container__label">
            Location
            <select
              className="select-location"
              defaultValue=""
              name="location"
              onChange={(e) => handleFilterChange(e.target)}
            >
              <option value="">-All Locations-</option>
              {createFilterSelectOptions("location")}
            </select>
          </label>
          <label className="filter-container__label">
            Category
            <select
              className="select-category"
              defaultValue=""
              name="category"
              onChange={(e) => handleFilterChange(e.target)}
            >
              <option value="">-All Categories-</option>
              {createFilterSelectOptions("category")}
            </select>
          </label>
        </section>
        <hr />
        <section className="show-all-upcoming-meetups-container">
          {renderedMeetupItems()}
        </section>
      </section>
    </div>
  );
}
