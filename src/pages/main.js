import { Card, Container, Form, DropdownButton, Dropdown, InputGroup, CardGroup } from 'react-bootstrap'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import debounce from 'lodash/debounce'
import axios from 'axios'
import { requests } from '../ultilities/requests'
import styled from 'styled-components'
import moment from 'moment'

const StyledSuggestionUl = styled.ul`
  position: absolute;
  margin: 0 auto;
  padding: 0;
  max-height: 390px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 5px 0 5px;
  border-left: none;
  border-right: none;
`

const StyledSuggestionLi = styled.li`
  list-style: none;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 10px 15px 10px 25px;
  border: 1px solid #CCC;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 3px;
`

const StyledCardGroups = styled(CardGroup)`
  display: flex;
  flex-flow: row wrap;
`

const StyledCards = styled(Card)`
  margin: 1rem;
  padding: 2rem;
  border: 1px solid white;
`

const SelectBox = ({ citiesList, clickItem }) => {
  const [city, setCity] = useState('')
  // const citiesList = props.citiesList
  console.log('test list: ', citiesList)
  console.log('type: ', typeof citiesList)
  let selectCityElement = useRef()

  // useEffect(() => {
  //   selectCityElement.current.click()
  // }, [citiesList])

  // let citiesOptions = citiesList.citiesList.map ? (cityInList =>
  //   {
  //     console.log('test city: ', cityInList)
  //     return <option value="city" selected={cityInList.woeid === city.woeid}>{ cityInList }</option>
  //   }
  // ) : ''

  return (
  <div className="">
    {/* <label>City :</label> */}
      <StyledSuggestionUl>
        {
          citiesList ? citiesList.map((cityInList, index) =>(<StyledSuggestionLi key={index} onClick={e => clickItem(cityInList)}>{ cityInList.title }</StyledSuggestionLi>)) : ''
        }
      </StyledSuggestionUl>
    {/* <select ref={selectCityElement} value={city} className="" name="city" onChange={e => setCity(e.target.value)}>
      {
        citiesList ? citiesList.map((cityInList, index) =>(<option key={index} value={cityInList.title}>{ cityInList.title }</option>)) : ''
      } */}
        {/* <option selected>Select City</option>
        <option value="1">city 1</option>
        <option value="2">city 2</option>
        <option value="3">city 3</option> */}
    {/* </select> */}
  </div>
  )
}

const Main = () => {
  const [ city, setCity ] = useState('')
  const [ cityList, setCityList ] = useState([])
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [datesWeather, setDatesWeather] = useState([])

  let formattedCitiesList = []
  let selectCityElement = React.createRef()

  // useEffect(() => {
  //   getCityList(city)
  // }, [city])

  // let selectClick = (element) ={
  //   element.click()
  // }

  const getDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = date.getFullYear()
    const formattedDate = `${yyyy}/${mm}/${dd}`
    return formattedDate
  }

  const clickItem = (item) => {
    console.log('item: ', item)
    setShowSuggestion(false)
    setCity(item.title)
    const dates = []
    for (let i = 0; i < 5; i++) {
      let newDate = new Date()
      newDate.setDate(newDate.getDate() + i)
      const date = getDate(newDate)
      dates.push(date)
    }
    getWeather(item, dates)
  }

  const getWeather = async(city, dates) => {
    console.log('city: ', city, ' date: ', dates)
    const promises = []
    let formattedResults = []
    for (let i = 0; i < dates.length; i++) {
      promises.push(requests('get', `location/${city.woeid}/${dates[i]}`))
    }
    Promise.all(promises)
      .then(result => {
        console.log(JSON.stringify(result))
        console.log('result 0: ', result[0])
        // formattedResults.push[result[0]]
        for (let i = 0; i < result.length; i++) {
          console.log('pushed: ', result[i][0])
          formattedResults.push({
            date: dates[i],
            weather: result[i][0],
            index: i})
          console.log('wtf: ', formattedResults)
        }
        setDatesWeather(formattedResults)
        console.log('formatted result: ', formattedResults)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getCityList = useCallback(debounce(async (city) => {
      const citiesRequest = await requests('get', `location/search/?query=${city}`)
      console.log('test city: ', citiesRequest)
      formattedCitiesList = citiesRequest ? citiesRequest.map(city => ({
        title: city.title || '',
        woeid: city.woeid || ''
      })) : ''
      console.log('formatted: ', formattedCitiesList)
      setCityList(formattedCitiesList)
      setShowSuggestion(true)

      // selectCityElement.click()
    }, 1000), [])

  return (
    <div>
      {/* <InputGroup>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title='city'
          // onSelect={e => {
          //   console.log('test: ', e)
          //   setCity(e)
          // }}
        >
          { cityList ? cityList.map(cityInList => (<Dropdown.Item
            onSelect={(key, e) => {
              console.log('test: ', e)
              setCity(e)
            }}
           key={cityInList.woeid}>{ cityInList.title }</Dropdown.Item>)) : ''}
        </DropdownButton>
        <Form.Control type="text" placehoder="Enter city..." onChange={e => {
            getCityList(e.target.value)
            setCity(e.target.value)
          }}></Form.Control>
      </InputGroup> */}
      
      <Form>
        <Form.Group>
          {/* <Form.Label>Enter city to search</Form.Label> */}
          <Form.Control type="text" placeholder="Search city..." value={city} onChange={e => {
            getCityList(e.target.value)
            setCity(e.target.value)
          }}>
          </Form.Control>
        </Form.Group>
      </Form>
      {
        showSuggestion ? <SelectBox citiesList={cityList} clickItem={clickItem}/> : ''
      }
      <Container>
        <StyledCardGroups>
          {
            datesWeather && datesWeather.length > 0 ? 
            datesWeather.map((dateWeather, index) => {
              return (
              <StyledCards key={index}>
                <Card.Body>
                  <Card.Title>{ `${moment(dateWeather.date).format('dddd')}` }</Card.Title>
                  <Card.Text>{ `Date: ${dateWeather.date}`}</Card.Text>
                  <Card.Text>{ `Max temparate: ${Math.round(dateWeather.weather.max_temp)}` }</Card.Text>
                  <Card.Text>{ `Min temparate: ${Math.round(dateWeather.weather.min_temp)}` }</Card.Text>
                </Card.Body>
              </StyledCards>
              )
            }) : ''
          }
        </StyledCardGroups>
      </Container>
    </div>
  )
}

export default Main
