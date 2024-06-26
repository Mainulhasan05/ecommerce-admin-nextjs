import Grid from '@mui/material/Grid'
import axiosInstance from 'utils/axiosInstance'
import { fetchDashboard } from 'features/dashboard/dashboardSlice'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import Link from 'next/link'

export const getServerSideProps = async (context) => {
  // get the token from the request
  const token = context.req.cookies.token
  
  
  if (!token || token === 'null' || token==='undefined') {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false,
      },
    }
  }
  // if the token is present, return the token
  return {
    props: { token },
  }
}

const Dashboard = () => {
  const dispatch=useDispatch()
  const {user,shop}=useSelector(state=>state.user)
  
  dispatch(fetchDashboard())
  return (
    <ApexChartWrapper>
      <Grid className='mb-4' item xs={12}>
        {/* invite them to join our facebook group and another link to our facebook page */}
        <h4>Join Our Facebook Group</h4>
        <Button variant='contained' color='primary' href='https://www.facebook.com/groups/962041555409574'>
          Join Group
        </Button>
        {/* give a margin between them */}

        <Button className='mx-4' variant='contained' color='primary' href='https://www.facebook.com/SuchonaMartOfficial'>
          Like Page
        </Button>
      </Grid>

      <Grid container spacing={6}>

      {
        user && user.hasShop==false && (
          
          <Grid item xs={12}>
            {
              (user && !shop) && <h4>প্রথমে আপনার শপ তৈরী করুন</h4>
            }
            {/* create a button name create */}
            <Link href="/account-settings">
            <Button type='reset' variant='contained' color='primary'>
              Create Shop
            </Button>
            </Link>
            
          </Grid>
        )
      }
      <Grid item xs={12}>
        {/* heading Recent Activites */}
        <h4>Recent Activities</h4>
          <Table />
        </Grid>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
