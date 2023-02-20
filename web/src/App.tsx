import { Habits } from "./components/Habits";
import "./styles/global.css";

export default function App() {
  return (
    <div>
      <Habits completed={3} />
      <Habits completed={4} />
      <Habits completed={9} />
      <Habits completed={150} />
      <Habits completed={143} />
      <Habits completed={10} />
      <Habits completed={33} />
      <Habits completed={53} />
      <Habits completed={38} />
      <Habits completed={37} />
      <Habits completed={30} />
    </div>
  );
}
