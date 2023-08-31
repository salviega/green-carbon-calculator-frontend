import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useColorMode, Box } from '@chakra-ui/react'
import { EmissionDetails } from '../../models/emission-details.model'

const Chart = dynamic(() => import('react-apexcharts'), {
	ssr: false
})

const ResultsChart: React.FC<EmissionDetails> = ({
	co2_amount,
	sections
}: EmissionDetails) => {
	const sectionValues = Object.values(sections)
	const sectionKeys = Object.keys(sections)
	const [series, setSeries] = useState<number[]>(sectionValues)
	const [keys, setKey] = useState<string[]>(sectionKeys)
	const { colorMode } = useColorMode()

	const labelColor = colorMode === 'dark' ? 'white' : 'black'

	const [options, setOptions] = useState<any>({
		chart: {
			type: 'donut'
		},
		labels: keys,
		colors: [
			'#3AB39A',
			'#F89211',
			'#39BBF3',
			'#757EF1',
			'#b8dd3f',
			'#363b6a',
			'#e95577'
		],
		tooltip: {
			y: {
				formatter: function (val: number) {
					return `${val.toFixed(2)}%`
				}
			}
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						name: {
							show: true,
							fontSize: '22px',
							fontFamily: 'Rubik',
							color: '#dfsda',
							offsetY: -10
						},
						value: {
							show: true,
							fontSize: '16px',
							fontFamily: 'Helvetica, Arial, sans-serif',
							color: undefined,
							offsetY: 16,
							formatter: function (val: number) {
								return val.toFixed(2).toString() // Convert val to string using toFixed()
							}
						},
						total: {
							show: true,
							label: 'Total',
							color: '#373d3f',
							fontFamily: 'Helvetica, Arial, sans-serif',
							fontWeight: 'bold',
							formatter: function (w: any) {
								const totalValue = w.globals.seriesTotals.reduce(
									(a: number, b: number) => {
										return a + b
									},
									0
								)
								return totalValue.toFixed(2)
							}
						}
					}
				}
			}
		},
		legend: {
			offsetY: 0,
			position: 'bottom',
			horizontalAlign: 'left',
			labels: {
				colors: [
					labelColor,
					labelColor,
					labelColor,
					labelColor,
					labelColor,
					labelColor,
					labelColor
				]
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
		const sectionValues = Object.values(sections)
		setSeries(sectionValues)
	}, [sections, co2_amount])

	return (
		<Box>
			<Chart options={options} series={series} type='donut' />
		</Box>
	)
}

export default ResultsChart
