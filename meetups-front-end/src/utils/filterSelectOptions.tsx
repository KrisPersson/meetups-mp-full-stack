const location = [
  "Event centers",
  "Eateries and coffee shops",
  "Resorts",
  "Cruise ships",
  "Islands",
  "Ranches",
  "Hotels",
  "Bookstores",
  "Public libraries",
  "The Internet",
];
const categories = [
  "Problem-solving meetings",
  "Planning meetings",
  "Decision-making meetings",
  "Status Update",
  "Team building",
  "Brainstorming",
  "Informal meetings",
  "Formal meetings",
  "Information sharing",
  "Magic Poopers meeting",
];

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export function createFilterSelectOptions(filterName: "location" | "category") {
  const array = filterName === "location" ? [...location] : [...categories];
  return array.map((item, i) => {
    return (
      <option key={i + item} value={item.toLowerCase()}>
        {item}
      </option>
    );
  });
}
