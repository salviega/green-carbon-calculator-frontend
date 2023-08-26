import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useColorMode, Box } from '@chakra-ui/react'

const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false
})

const LiveVisitsChart: React.FC = () => {
	const [series, setSeries] = useState<number[]>([72, 56, 30, 20])
	const { colorMode } = useColorMode()

	const labelColor = colorMode === 'dark' ? 'white' : 'black'

	const [options, setOptions] = useState<any>({
		chart: {
			type: 'donut'
		},
		labels: ['Energy', 'Mobility', 'Materials', 'Transport'],
		colors: ['#3AB39A', '#F89211', '#39BBF3', '#757EF1'],
		tooltip: {
			y: {
				formatter: function (val: number) {
					return `${val}%`
				}
			}
		},
		legend: {
			offsetY: 2,
			position: 'bottom',
			horizontalAlign: 'center',
			labels: {
				colors: [labelColor, labelColor, labelColor, labelColor]
			}
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 200
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		]
	})

	useEffect(() => {
		setOptions((prevOptions: any) => ({
			...prevOptions,
			legend: {
				...prevOptions.legend,
				labels: {
					colors: [labelColor, labelColor, labelColor, labelColor]
				}
			}
		}))
	}, [colorMode])

	return (
		<Box>
			<Chart options={options} series={series} height='400' type='donut' />
		</Box>
	)
}

export default LiveVisitsChart
