import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const PromptCard = ({data}) => {
    return (
        <div>
            <Card className="">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src={data.logoUrl}
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md">{data.name}</p>
                        <p className="text-xs text-default-500">{data.address.city} {data.address.firstLine} {data.address.postCode}</p>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <p>{data.cuisines.map(cuisine => cuisine.name).join(', ')}</p>
                </CardBody>
                <Divider/>
                <CardFooter>
                <p>Rating: {data.rating.starRating}</p>
                </CardFooter>
            </Card>
        </div>

    );
}

export default PromptCard;
