import Wallet from '@/components/Wallet'
import React, { useEffect, useRef, useState } from 'react'

export default function Explorer() {
	const onCo2Storage = () => {
		console.log('print')
	}
	return (
		<>
			<Wallet />
			<button onClick={onCo2Storage}>HAHAHA</button>
		</>
	)
}
