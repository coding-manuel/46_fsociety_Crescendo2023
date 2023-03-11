import React, { useState } from "react";
import { Group, Select, Button, Anchor, Text } from "@mantine/core";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import { notifications } from "@mantine/notifications";

const Recommender = () => {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [isCalled, setIsCalled] = useState(false);

  const [searchValue, onSearchChange] = useState("");

  const handleClick = async () => {
    setIsLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append("course", searchValue);

    try {
      axios({
        method: "post",
        url: "http://127.0.0.1:5000/recommend",
        data: bodyFormData,
      })
        .then(function (response) {
          //handle success
          setData(response);
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
      setIsCalled(true);
    }
  };

  return (
    <>
      <Select
        label="What do you wanna learn..."
        placeholder="Pick one"
        searchable
        onSearchChange={onSearchChange}
        searchValue={searchValue}
        data={[
          { value: "Web Development", label: "Web Development" },
          { value: "Blockchain", label: "Blockchain" },
          { value: "Mobile Development", label: "Mobile Development" },
          { value: "Programming", label: "Programming" },
          { value: "Image Processing", label: "Image Processing" },
          { value: "Cloud", label: "Cloud" },
          { value: "Security", label: "Security" },
          { value: "Project Management", label: "Project Management" },
          { value: "Business", label: "Business" },
          { value: "Economics", label: "Economics" },
          { value: "Art", label: "Art" },
          { value: "Data Analysis", label: "Data Analysis" },
          { value: "Economics", label: "Economics" },
          { value: "Science", label: "Science" },
          { value: "Marketing", label: "Marketing" },
          { value: "Research", label: "Research" },
          { value: "AI & ML", label: "AI & ML" },
        ]}
      />
      <Button
        color="gray"
        size="md"
        onClick={() =>
          searchValue != ""
            ? handleClick()
            : notifications.show({
                title: "Alert",
                message: "Enter an option! 🤥",
              })
        }
      >
        Find Recommendation
      </Button>
      {isLoading && <h2>Loading...</h2>}
      {isCalled && (
        <Carousel
          withIndicators
          height={200}
          slideSize="33.333333%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
        >
          {data.data.map((course) => {
            return (
              <Carousel.Slide>
                <Anchor href={course.url} target="_blank">
                  {course.course_name}
                </Anchor>
                <Text fz="xs">{course.course_desc}</Text>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      )}
    </>
  );
};

export default Recommender;
