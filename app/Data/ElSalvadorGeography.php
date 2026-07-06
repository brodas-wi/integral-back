<?php

namespace App\Data;

class ElSalvadorGeography
{
    /**
     * Get all departments of El Salvador
     */
    public static function departments(): array
    {
        return [
            'Ahuachapán',
            'Cabañas',
            'Chalatenango',
            'Cuscatlán',
            'La Libertad',
            'La Paz',
            'La Unión',
            'Morazán',
            'San Miguel',
            'San Salvador',
            'San Vicente',
            'Santa Ana',
            'Sonsonate',
            'Usulután',
        ];
    }

    /**
     * Get all zones
     */
    public static function zones(): array
    {
        return [
            'Occidental',
            'Paracentral',
            'Central',
            'Oriental',
        ];
    }

    /**
     * Get municipalities by department
     */
    public static function municipalities(string $department): array
    {
        $data = [
            'Ahuachapán' => [
                'Ahuachapán',
                'Apaneca',
                'Atiquizaya',
                'Concepción de Ataco',
                'El Refugio',
                'Guaymango',
                'Jujutla',
                'San Francisco Menéndez',
                'San Lorenzo',
                'San Pedro Puxtla',
                'Tacuba',
                'Turín',
            ],
            'Santa Ana' => [
                'Candelaria de la Frontera',
                'Chalchuapa',
                'Coatepeque',
                'El Congo',
                'El Porvenir',
                'Masahuat',
                'Metapán',
                'San Antonio Pajonal',
                'San Sebastián Salitrillo',
                'Santa Ana',
                'Santa Rosa Guachipilín',
                'Santiago de la Frontera',
                'Texistepeque',
            ],
            'Sonsonate' => [
                'Acajutla',
                'Armenia',
                'Caluco',
                'Cuisnahuat',
                'Izalco',
                'Juayúa',
                'Nahuizalco',
                'Nahulingo',
                'Salcoatitán',
                'San Antonio del Monte',
                'San Julián',
                'Santa Catarina Masahuat',
                'Santa Isabel Ishuatán',
                'Santo Domingo de Guzmán',
                'Sonsonate',
                'Sonzacate',
            ],
            'La Libertad' => [
                'Antiguo Cuscatlán',
                'Chiltiupán',
                'Ciudad Arce',
                'Colón',
                'Comasagua',
                'Huizúcar',
                'Jayaque',
                'Jicalapa',
                'La Libertad',
                'Nueva San Salvador',
                'Nuevo Cuscatlán',
                'Quezaltepeque',
                'Sacacoyo',
                'San José Villanueva',
                'San Juan Opico',
                'San Matías',
                'San Pablo Tacachico',
                'Talnique',
                'Tamanique',
                'Teotepeque',
                'Tepecoyo',
                'Zaragoza',
            ],
            'San Salvador' => [
                'Aguilares',
                'Apopa',
                'Ayutuxtepeque',
                'Cuscatancingo',
                'Delgado',
                'El Paisnal',
                'Guazapa',
                'Ilopango',
                'Mejicanos',
                'Nejapa',
                'Panchimalco',
                'Rosario de Mora',
                'San Marcos',
                'San Martín',
                'San Salvador',
                'Santiago Texacuangos',
                'Santo Tomás',
                'Soyapango',
                'Tonacatepeque',
            ],
            'Chalatenango' => [
                'Agua Caliente',
                'Arcatao',
                'Azacualpa',
                'Chalatenango',
                'Citalá',
                'Comalapa',
                'Concepción Quezaltepeque',
                'Dulce Nombre de María',
                'El Carrizal',
                'El Paraíso',
                'La Laguna',
                'La Palma',
                'La Reina',
                'Las Vueltas',
                'Nueva Concepción',
                'Nueva Trinidad',
                'Nombre de Jesús',
                'Ojos de Agua',
                'Potonico',
                'San Antonio de la Cruz',
                'San Antonio Los Ranchos',
                'San Fernando',
                'San Francisco Lempa',
                'San Francisco Morazán',
                'San Ignacio',
                'San Isidro Labrador',
                'San José Cancasque',
                'San José Las Flores',
                'San Luis del Carmen',
                'San Miguel de Mercedes',
                'San Rafael',
                'Santa Rita',
                'Tejutla',
            ],
            'Cuscatlán' => [
                'Candelaria',
                'Cojutepeque',
                'El Carmen',
                'El Rosario',
                'Monte San Juan',
                'Oratorio de Concepción',
                'San Bartolomé Perulapía',
                'San Cristóbal',
                'San José Guayabal',
                'San Pedro Perulapán',
                'San Rafael Cedros',
                'San Ramón',
                'Santa Cruz Analquito',
                'Santa Cruz Michapa',
                'Suchitoto',
                'Tenancingo',
            ],
            'La Paz' => [
                'Cuyultitán',
                'El Rosario',
                'Jerusalén',
                'Mercedes La Ceiba',
                'Olocuilta',
                'Paraíso de Osorio',
                'San Antonio Masahuat',
                'San Emigdio',
                'San Francisco Chinameca',
                'San Juan Nonualco',
                'San Juan Talpa',
                'San Juan Tepezontes',
                'San Luis La Herradura',
                'San Luis Talpa',
                'San Miguel Tepezontes',
                'San Pedro Masahuat',
                'San Pedro Nonualco',
                'San Rafael Obrajuelo',
                'Santa María Ostuma',
                'Santiago Nonualco',
                'Tapalhuaca',
                'Zacatecoluca',
            ],
            'Cabañas' => [
                'Cinquera',
                'Dolores',
                'Guacotecti',
                'Ilobasco',
                'Jutiapa',
                'San Isidro',
                'Sensuntepeque',
                'Tejutepeque',
                'Victoria',
            ],
            'San Vicente' => [
                'Apastepeque',
                'Guadalupe',
                'San Cayetano Istepeque',
                'San Esteban Catarina',
                'San Ildefonso',
                'San Lorenzo',
                'San Sebastián',
                'San Vicente',
                'Santa Clara',
                'Santo Domingo',
                'Tecoluca',
                'Tepetitán',
                'Verapaz',
            ],
            'Usulután' => [
                'Alegría',
                'Berlín',
                'California',
                'Concepción Batres',
                'El Triunfo',
                'Ereguayquín',
                'Estanzuelas',
                'Jiquilisco',
                'Jucuapa',
                'Jucuarán',
                'Mercedes Umaña',
                'Nueva Granada',
                'Ozatlán',
                'Puerto El Triunfo',
                'San Agustín',
                'San Buenaventura',
                'San Dionisio',
                'San Francisco Javier',
                'Santa Elena',
                'Santa María',
                'Santiago de María',
                'Tecapán',
                'Usulután',
            ],
            'San Miguel' => [
                'Carolina',
                'Chapeltique',
                'Chinameca',
                'Chirilagua',
                'Ciudad Barrios',
                'Comacarán',
                'El Tránsito',
                'Lolotique',
                'Moncagua',
                'Nueva Guadalupe',
                'Nuevo Edén de San Juan',
                'Quelepa',
                'San Antonio del Mosco',
                'San Gerardo',
                'San Jorge',
                'San Luis de la Reina',
                'San Miguel',
                'San Rafael Oriente',
                'Sesori',
                'Uluazapa',
            ],
            'Morazán' => [
                'Arambala',
                'Cacaopera',
                'Chilanga',
                'Corinto',
                'Delicias de Concepción',
                'El Divisadero',
                'El Rosario',
                'Gualococti',
                'Guatajiagua',
                'Joateca',
                'Jocoaitique',
                'Jocoro',
                'Lolotiquillo',
                'Meanguera',
                'Osicala',
                'Perquín',
                'San Carlos',
                'San Fernando',
                'San Francisco Gotera',
                'San Isidro',
                'San Simón',
                'Sensembra',
                'Sociedad',
                'Torola',
                'Yamabal',
                'Yoloaiquín',
            ],
            'La Unión' => [
                'Anamorós',
                'Bolívar',
                'Concepción de Oriente',
                'Conchagua',
                'El Carmen',
                'El Sauce',
                'Intipucá',
                'La Unión',
                'Lilique',
                'Meanguera del Golfo',
                'Nueva Esparta',
                'Pasaquina',
                'Polorós',
                'San Alejo',
                'San José',
                'Santa Rosa de Lima',
                'Yayantique',
                'Yucuaiquín',
            ],
        ];

        return $data[$department] ?? [];
    }

    /**
     * Get zone by department
     */
    public static function zoneByDepartment(string $department): string
    {
        $mapping = [
            'Occidental' => ['Ahuachapán', 'Santa Ana', 'Sonsonate'],
            'Paracentral' => ['Chalatenango', 'Cuscatlán', 'La Paz', 'Cabañas', 'San Vicente'],
            'Central' => ['La Libertad', 'San Salvador'],
            'Oriental' => ['Usulután', 'San Miguel', 'Morazán', 'La Unión'],
        ];

        foreach ($mapping as $zone => $departments) {
            if (in_array($department, $departments)) {
                return $zone;
            }
        }

        return 'Central';
    }

    /**
     * Check if department exists
     */
    public static function departmentExists(string $department): bool
    {
        return in_array($department, self::departments());
    }

    /**
     * Check if municipality exists for department
     */
    public static function municipalityExists(string $department, string $municipality): bool
    {
        return in_array($municipality, self::municipalities($department));
    }

    /**
     * Centroids of departments aproximated
     */
    private static function departmentCentroids(): array
    {
        return [
            'Ahuachapán'   => ['lat' => 13.9214, 'lng' => -89.8450, 'zoom' => 11],
            'Santa Ana'    => ['lat' => 13.9494, 'lng' => -89.5599, 'zoom' => 11],
            'Sonsonate'    => ['lat' => 13.7186, 'lng' => -89.7244, 'zoom' => 11],
            'Chalatenango' => ['lat' => 14.1000, 'lng' => -89.1667, 'zoom' => 10],
            'La Libertad'  => ['lat' => 13.6769, 'lng' => -89.3200, 'zoom' => 11],
            'San Salvador' => ['lat' => 13.7000, 'lng' => -89.2000, 'zoom' => 12],
            'Cuscatlán'    => ['lat' => 13.7333, 'lng' => -89.0500, 'zoom' => 11],
            'La Paz'       => ['lat' => 13.5000, 'lng' => -88.9500, 'zoom' => 11],
            'Cabañas'      => ['lat' => 13.8667, 'lng' => -88.6333, 'zoom' => 11],
            'San Vicente'  => ['lat' => 13.6333, 'lng' => -88.7833, 'zoom' => 11],
            'Usulután'     => ['lat' => 13.3500, 'lng' => -88.4500, 'zoom' => 10],
            'San Miguel'   => ['lat' => 13.4833, 'lng' => -88.1833, 'zoom' => 10],
            'Morazán'      => ['lat' => 13.7667, 'lng' => -88.1167, 'zoom' => 10],
            'La Unión'     => ['lat' => 13.3372, 'lng' => -87.8433, 'zoom' => 10],
        ];
    }

    /**
     * Get the centroid (lat, lng, zoom) for a single department.
     */
    public static function centroid(string $department): ?array
    {
        return self::departmentCentroids()[$department] ?? null;
    }

    /**
     * Get all department centroids at once.
     */
    public static function centroids(): array
    {
        return self::departmentCentroids();
    }
}
