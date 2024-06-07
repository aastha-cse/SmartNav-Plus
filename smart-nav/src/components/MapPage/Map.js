import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FaLocationArrow,
  FaTimes,
  FaArrowRight,
  FaRupeeSign,
} from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Temp from "./Temp.js";

const center = { lat: 30.3165, lng: 78.0322 };
const libraries = ["places"];

function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [map, setMap] = useState(null);
  const [mapType, setMapType] = useState("roadmap");
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [cost, setCost] = useState("");
  const [showDistanceDuration, setShowDistanceDuration] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [average, setAverage] = useState("");
  const [showCost, setShowCost] = useState(false);
  const [showTemp, setShowTemp] = useState(false);
  const [isAverageModalOpen, setIsAverageModalOpen] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(center); 

  const originRef = useRef();
  const destiantionRef = useRef();

  useEffect(() => {
    if (average !== "" && distance !== "") {
      const distanceInKm = parseFloat(distance.replace(/,/g, "").replace(" km", ""));
      setCost((104 * distanceInKm) / parseFloat(average));
    }
  }, [average, distance]);

  const handleModalClose = (e) => {
    setIsAverageModalOpen(false);
  };

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const toggleMapType = (mapType) => {
    setMapType(mapType);
    if (mapType === "roadmap") {
      map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
    } else if (mapType === "satellite") {
      map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE);
    } else if (mapType === "streetview") {
      const panorama = map.getStreetView();
      const destination = destiantionRef.current.value;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: destination }, (results, status) => {
        if (status === "OK" && results[0]) {
          const destLocation = results[0].geometry.location;
          panorama.setPosition(destLocation);
          panorama.setVisible(true);
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
        }
      });
    }
  };

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    const distanceText = results.routes[0].legs[0].distance.text;
    setDistance(distanceText);
    setDuration(results.routes[0].legs[0].duration.text);
    setShowDistanceDuration(true);
    setShowStartButton(true);

    const distanceInKm = parseFloat(distanceText.replace(/,/g, "").replace(" km", ""));
    if (average !== "" && distanceInKm !== "") {
      setCost((104 * distanceInKm) / parseFloat(average));
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setCost("");
    setShowDistanceDuration(false);
    setShowStartButton(false);
    originRef.current.value = "";
    destiantionRef.current.value = "";
    clearInterval(intervalId);
  }

  const handleStartJourney = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if(currentLocation) setCurrentLocation(userLocation);

        const interval = setInterval(async () => {
          const directionsService = new window.google.maps.DirectionsService();
          const results = await directionsService.route({
            origin: userLocation,
            destination: destiantionRef.current.value,
            travelMode: window.google.maps.TravelMode.DRIVING,
          });
          setDirectionsResponse(results);
          setDistance(results.routes[0].legs[0].distance.text);
          setDuration(results.routes[0].legs[0].duration.text);
        }, 10000);

        setIntervalId(interval);
        map.panTo(userLocation);
        map.setZoom(15);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const toggleTemp = () => {
    setShowTemp(!showTemp);
  };

  const toggleCost = () => {
    setShowCost(!showCost);
  };

  const handleAverageInputChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "" || value === "." || value === ".0") {
      setAverage(parseFloat(value));
    }
  };

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: true,
            mapTypeControl: false,
            fullscreenControl: false,
            mapTypeId: mapType,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Origin" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" placeholder="Destination" ref={destiantionRef} />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button
              colorScheme="pink"
              type="submit"
              onClick={calculateRoute}
              _focus={{ outline: "none" }}
            >
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              _focus={{ outline: "none" }}
              onClick={() => {
                clearRoute();
              }}
            />
          </ButtonGroup>
        </HStack>
        {showDistanceDuration && showStartButton && cost !== "" && (
          <HStack spacing={4} mt={4} justifyContent="space-between">
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <ButtonGroup>
              <Menu>
                <MenuButton as={Button} colorScheme="pink">
                  Map Views
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => toggleMapType("roadmap")}>
                    Map
                  </MenuItem>
                  <MenuItem onClick={() => toggleMapType("satellite")}>
                    Satellite
                  </MenuItem>
                  <MenuItem onClick={() => toggleMapType("streetview")}>
                    Street View
                  </MenuItem>
                </MenuList>
              </Menu>
              <IconButton
                aria-label="center back"
                icon={<FaArrowRight />}
                onClick={handleStartJourney}
                _focus={{ outline: "none" }}
              ></IconButton>
            </ButtonGroup>
          </HStack>
        )}
      </Box>
      <IconButton
        position="fixed"
        bottom="14"
        right="4"
        aria-label="center back"
        icon={<FaLocationArrow style={{ color: "white" }} />}
        isRound
        backgroundColor="rgb(91, 90, 90)"
        _hover={{ backgroundColor: "rgb(128, 126, 126)" }}
        _focus={{ outline: "none" }}
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              map.panTo(userLocation);
              map.setZoom(15);
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
        }}
      />
      <IconButton
        position="fixed"
        top="105"
        right="4"
        width={57}
        height={57}
        aria-label="Weather"
        icon={
          <TiWeatherPartlySunny
            style={{ color: "white", height: "27px", width: "27px" }}
          />
        }
        isRound
        backgroundColor="rgb(91, 90, 90)"
        _hover={{ backgroundColor: "rgb(128, 126, 126)" }}
        _focus={{ outline: "none" }}
        onClick={toggleTemp}
      />
      <IconButton
        position="fixed"
        bottom="2"
        right="4"
        aria-label="Fuel Cost"
        icon={<FaRupeeSign style={{ color: "white" }} />}
        isRound
        backgroundColor="rgb(91, 90, 90)"
        _hover={{ backgroundColor: "rgb(128, 126, 126)" }}
        _focus={{ outline: "none" }}
        onClick={toggleCost}
      />
      {showTemp && <Temp defaultLocation={destiantionRef.current.value} />}

      <Modal isOpen={isAverageModalOpen} onClose={handleModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Enter the average cost per kilometer of your car for fuel cost
            estimation...
          </ModalHeader>
          <ModalBody>
            <Input
              type="number"
              step="any"
              placeholder="Average cost per kilometer"
              value={average}
              onChange={handleAverageInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="pink" onClick={handleModalClose}>
              Enter
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {showCost && (
        <Box
          position="fixed"
          bottom="2"
          right="65px"
          p={2}
          width="fit-content"
          borderRadius="lg"
          boxShadow="0.1px 0.1px 15px 0.5px"
          zIndex="2"
          fontSize={14}
          color="rgb(111, 109, 109)"
          bgColor="rgba(255, 255, 255, 0.05)"
          backdropFilter="blur(7px)"
        >
          <Text>Fuel Cost: {parseInt(cost)}</Text>
        </Box>
      )}
    </Flex>
  );
}

export default Map;
