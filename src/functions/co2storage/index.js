export async function addTemplate() {
	// Template parameters
	const certificateTemplate = {
		owner: { type: 'string' },
		image: { type: 'string' },
		project_name: { type: 'string' },
		project_description: { type: 'string' },
		event_id: { type: 'string' },
		event_name: { type: 'string' },
		event_description: { type: 'string' },
		event_duration: { type: 'number' },
		country: { type: 'string' },
		participants: { type: 'number' },
		employees: { type: 'number' },
		heated_area: { type: 'number' },
		air_conditioned_area: { type: 'number' },
		number_of_people_arriving_by_car: { type: 'number' },
		average_distance_traveled_by_car: { type: 'string' },
		number_of_people_traveling_by_public_transport: { type: 'number' },
		short_haul_flights: { type: 'number' },
		medium_haul_flights: { type: 'number' },
		long_haul_flights: { type: 'number' },
		percentage_business_class: { type: 'string' },
		over_night_stay_three_stars: { type: 'string' },
		over_night_stay_four_stars: { type: 'string' },
		over_night_stay_five_stars: { type: 'string' },
		meal_meat_amount: { type: 'string' },
		meal_vegetarian_amount: { type: 'string' },
		snacks_amount: { type: 'string' },
		soda_liters: { type: 'string' },
		coffee_cups: { type: 'string' },
		tea_cups: { type: 'string' },
		wine_liters: { type: 'string' },
		beer_liters: { type: 'string' },
		spirits_liters: { type: 'string' },
		power_consumption: { type: 'string' },
		printed_matter: { type: 'string' },
		plastics: { type: 'string' },
		recyclable_material: { type: 'string' },
		plant_based_materials: { type: 'string' },
		event_stand_area: { type: 'string' },
		transported_weight: { type: 'string' },
		transported_distance: { type: 'string' },
		garbage: { type: 'string' },
		recycling: { type: 'string' }
	}

	const templateName = 'Footprint'
	const templateDescription =
		'Template to compensate netzero certificate events'
	const chainName = 'Footprint'

	// Create template
	const addTemplateResponse = await fgStorage.addTemplate(
		template,
		templateName,
		null,
		templateDescription,
		null,
		chainName
	)

	return addTemplateResponse
}
