import Reviews from "components/Reviews/Reviews";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const FoodDetailsBottom = ({ singleFood }) => {
  return (
    <div>
      <div className="pt-5 body">
        <div className="container ">
          <div className="leftSide">
            <Tabs>
              <TabList>
                <Tab>Overview</Tab>
                <Tab>Reviews </Tab>
              </TabList>

              <TabPanel>
                <div className="text-justify tab1">
                  {singleFood.description}
                </div>
              </TabPanel>
              <TabPanel>
                <Reviews />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsBottom;
