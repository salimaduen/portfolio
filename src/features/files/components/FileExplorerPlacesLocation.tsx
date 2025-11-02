import CustomFolder from "./CustomFolder";

export interface FileExplorerPlacesLocationProps {
    locationName: string;
}

export default function FileExplorerPlacesLocation({ locationName }: FileExplorerPlacesLocationProps) {
    return (
        <div className="flex items-center">
            <CustomFolder />
            <p>{locationName}</p>
        </div>
    );
}