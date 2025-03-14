import { SkewLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary bg-opacity-40 z-50">
      <SkewLoader color="#EBC74F" cssOverride={{}} size={40} />
    </div>
  );
}
