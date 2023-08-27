import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useColorMode, Box } from '@chakra-ui/react'
import { EmissionDetails } from '../../models/emission-details.model';

const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false
})

const ResultsChart: React.FC<EmissionDetails> = ( {co2_amount, sections} : EmissionDetails) => {
	const sectionValues = Object.values(sections);
	const sectionKeys = Object.keys(sections);
	const [series, setSeries] = useState<number[]>(sectionValues);
	const [keys, setKey] = useState<string[]>(sectionKeys);
	const { colorMode } = useColorMode()

	const labelColor = colorMode === 'dark' ? 'white' : 'black'

	const [options, setOptions] = useState<any>({
		chart: {
			type: 'donut'
		},
		labels: keys,
		colors: ['#3AB39A', '#F89211', '#39BBF3', '#757EF1', '#b8dd3f', '#363b6a', '#e95577'],
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
			horizontalAlign: 'left',
			labels: {
				colors: [labelColor, labelColor, labelColor, labelColor, labelColor, labelColor, labelColor]
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
	useEffect(() => {
		const sectionValues = Object.values(sections);
  	const sectionKeys = Object.keys(sections);

	}, [sections])

	return (
		<Box>
			<Chart options={options} series={series} height='400' type='donut' />
		</Box>
	)
}

export default ResultsChart
