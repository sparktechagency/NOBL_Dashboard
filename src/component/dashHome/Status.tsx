// To use these icons, you'll need to install the lucide-react library:
// npm install lucide-react
// or
// yarn add lucide-react
import { FileText, Image as ImageIcon, Users, Video } from "lucide-react";

// A more specific type for the data prop for better type safety.
// This assumes the 'data' prop is an object with these keys.
interface StatusData {
  total_users: number;
  total_videos: number;
  total_images: number;
  total_documents: number;
}

// Define the props for the Status component
interface StatusProps {
  data?: StatusData; // Make data optional to avoid errors if it's loading
}

const Status = ({ data }: StatusProps) => {
  // We can define the structure of our cards here.
  // This makes it easier to manage and update.
  // The 'value' is now retrieved directly from the 'data' prop in the JSX.
  const cardConfig = [
    {
      id: 1,
      Icon: Users, // Using the imported icon component
      title: "Total Users",
      dataKey: "total_users", // Key to access the value from the data prop
      color: "bg-blue-500",
    },
    {
      id: 2,
      Icon: Video,
      title: "Total Videos",
      dataKey: "total_videos",
      color: "bg-green-500",
    },
    {
      id: 3,
      Icon: ImageIcon,
      title: "Total Images",
      dataKey: "total_images",
      color: "bg-purple-500",
    },
    {
      id: 4,
      Icon: FileText,
      title: "Total Documents",
      dataKey: "total_documents",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-4">
      {/* - Using grid for a responsive layout.
        - It starts with 1 column on small screens, 2 on medium screens, and 4 on large screens.
        - `gap-6` adds space between the cards.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardConfig.map((card) => (
          <div
            key={card.id}
            // `w-full` allows the card to take the full width of its grid column.
            // Added some hover effects for better UX.
            className="bg-white w-full p-6 flex flex-col justify-center items-center rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Icon container with a unique background color */}
            <div className={`p-4 rounded-full ${card.color} mb-4`}>
              <card.Icon className="text-white" size={32} />
            </div>

            <p className="py-1 font-sans text-gray-500 font-medium text-base">
              {card.title}
            </p>
            <h3 className="font-sans font-bold text-3xl text-gray-800">
              {/* - Access the value dynamically using the dataKey.
                - Show a loading indicator or default value if data is not yet available.
              */}
              {data ? data[card.dataKey as keyof StatusData] : "..."}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;
