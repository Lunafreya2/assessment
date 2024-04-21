import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {Chip} from "@nextui-org/react";
import {Skeleton} from "@nextui-org/react";

const rating = (starRating) => {
    let stars = '';
    let limit = Math.floor(starRating);
    for (let i = 0; i < limit; i++) {
        stars+= '⭐';
    }
    return <span>{stars}</span>
}


const PromptCard = ({data}) => {
    return (
            <Card fullWidth={true} className="max-h-full text-xl ">
                <CardHeader className="flex gap-3">
                    <Image
                        alt="restaurant-logo"
                        height={40}
                        radius="sm"
                        src={data.logoUrl}
                        width={40}
                    />
                    <div className="flex flex-col w-full">
                        <p className="text-md">{data.name}</p>
                        <div className="flex flex-row justify-between ">
                            <p className="text-sm text-default-500 overflow-hidden whitespace-nowrap text-ellipsis"> {data.address.firstLine} {data.address.city} {data.address.postCode}</p>
                            <div className="flex gap-1">
                                {data.cuisines.map((cuisine) => {
                                    if (cuisine.name === 'Deals' || cuisine.name === 'Collect stamps') {
                                        return <Chip size="sm" color="warning">{cuisine.name}</Chip>;
                                    }else {
                                        return <div style={{ height: '24px' }}></div>; // Adjust the height as per your requirements
                                    }
                                })}
                            </div>
                        </div>

                    </div>
                </CardHeader>
                <Divider/>
                <CardBody className="flex-row gap-1">
                    {data.cuisines.map((cuisine) => {
                        if (cuisine.name !== 'Deals' && cuisine.name !== 'Collect stamps') {
                            return <Chip color="default">{cuisine.name}</Chip>
                        }
                    })}

                </CardBody>
                <Divider/>
                <CardFooter>
                <p className="text-sm">Rating: {data.rating.starRating} {rating(data.rating.starRating)}</p>
                </CardFooter>
            </Card>
    );
}

export default PromptCard;
