
import type { UpgradeType } from '../types';

export const UPGRADE_DEFINITIONS: Record<UpgradeType, { name: string; description: string; baseCost: number; baseEffect: number; emoji: string }> = {
    'tap_power': {
        name: 'Cyber-Claw',
        description: '+1 Snip per tap',
        baseCost: 50, // Lowered from 100 for better early game 
        baseEffect: 1,
        emoji: '🦾'
    },
    'passive_income': {
        name: 'Auto-Bot Swarm',
        description: '+1 Snip per sec',
        baseCost: 200, // Lowered from 500
        baseEffect: 1,
        emoji: '🤖'
    },
    'energy_max': {
        name: 'Fusion Core',
        description: '+500 Max Energy',
        baseCost: 150,
        baseEffect: 500,
        emoji: '🔋'
    },
    'energy_regen': {
        name: 'Nano-Repair Bots',
        description: '+1 Energy per sec',
        baseCost: 300,
        baseEffect: 1,
        emoji: '⚡'
    }
};

export interface Mission {
    id: string;
    title: string;
    reward: number;
    link: string;
    icon: string;
}

export const MISSIONS: Mission[] = [
    {
        id: 'twitter_follow',
        title: 'Follow Clawnch Bot on X',
        reward: 50000,
        link: 'https://x.com/Clawnch_Bot',
        icon: '🐦'
    },
    {
        id: 'twitter_follow_argostroloji',
        title: 'Follow Argostroloji on X',
        reward: 50000,
        link: 'https://x.com/Argostroloji',
        icon: '🐦'
    }
];
