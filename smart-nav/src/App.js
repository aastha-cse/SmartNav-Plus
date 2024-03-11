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
} from "@chakra-ui/react";
import {
  FaLocationArrow,
  FaTimes,
  FaArrowRight,
  FaRupeeSign,
} from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import Temp from "./components/Temp";

const center = { lat: 30.3165, lng: 78.0322 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [cost, setCost] = useState("");
  const [showDistanceDuration, setShowDistanceDuration] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);
  // eslint-disable-next-line
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  // eslint-disable-next-line
  const [currentLocation, setCurrentLocation] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [average, setAverage] = useState("");
  const [showCost, setShowCost] = useState(false);
  const [showTemp, setShowTemp] = useState(false);

  const originRef = useRef();
  const destiantionRef = useRef();

  useEffect(() => {
    const averageValue = prompt(
      "Enter the average cost per kilometer of your car."
    );
    if (averageValue !== null) {
      setAverage(parseFloat(averageValue));
    }
  }, []);

  if (!isLoaded) {
    return <SkeletonText />;
  }

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
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setShowDistanceDuration(true);
    setShowStartButton(true);

    if (average !== "") {
      setCost((104 * parseFloat(distance)) / parseFloat(average));
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
        setCurrentLocationMarker({
          position: userLocation,
        });
        setCurrentLocation(userLocation);

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
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
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
              <Input
                type="text"
                placeholder="Destination"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label="center back"
              icon={<FaTimes />}
              onClick= {()=>{
                clearRoute()
            }}
            />
          </ButtonGroup>
        </HStack>
        {showDistanceDuration && showStartButton && cost !== "" && (
          <HStack spacing={4} mt={4} justifyContent="space-between">
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
            <IconButton
              aria-label="center back"
              icon={<FaArrowRight />}
              onClick={handleStartJourney}
            ></IconButton>
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
        backgroundColor={"black"}
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
        top="5"
        right="4"
        width={57}
        height={57}
        aria-label="Weather"
        icon={<FaRupeeSign style={{ color: "white" }} />}
        isRound
        backgroundColor={"black"}
        onClick={toggleTemp}
      />
      <IconButton
        position="fixed"
        bottom="2"
        right="4"
        aria-label="Fuel Cost"
        icon={<FaRupeeSign style={{ color: "white" }} />}
        isRound
        backgroundColor={"black"}
        onClick={toggleCost}
      />
      {showTemp && <Temp defaultLocation={destiantionRef.current.value} />}
      
        {showCost && (<Box
          position="fixed"
          bottom="2"
          right="65px"
          p={2}
          borderRadius="lg"
          boxShadow="0.1px 0.1px 15px 0.5px"
          zIndex="2"
          fontSize={14}
          color="rgb(111, 109, 109)"
          bgColor="rgba(255, 255, 255, 0.05)"
          backdropFilter= "blur(7px)"
        >
          <Text>Fuel Cost: {parseInt(cost)}</Text>
        </Box>)}
      
    </Flex>
  );
}

export default App;
