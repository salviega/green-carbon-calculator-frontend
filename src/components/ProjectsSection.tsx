import React from 'react'
import { SimpleGrid } from '@chakra-ui/react';
import ProyectCard from './ProyectCard';
const ProjectsSection = () => {
  const cardArray = Array.from({ length: 3 }, (_, index) => index);
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={5}>
      {cardArray.map((_, index) => <ProyectCard key={index} />)}
    </SimpleGrid>
  )
}

export default ProjectsSection
