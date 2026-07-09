import Card from "./Card";

interface PlaceholderCardProps {
    title: string;
    description: string;
}

export default function PlaceholderCard({
    title,
    description,
}: PlaceholderCardProps) {
    return (
        <Card className="flex h-72 items-center justify-center">

            <div className="text-center">

                <h2 className="text-lg font-semibold text-white">
                    {title}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                    {description}
                </p>

            </div>

        </Card>
    );
}