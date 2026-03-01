import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function BookingPage() {
    const [zones, setZones] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');
    const [availability, setAvailability] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const data = await api.getZones();
                setZones(data);
            } catch (error) {
                console.error("Error fetching zones:", error);
            }
        };
        fetchZones();
    }, []);

    useEffect(() => {
        if (selectedZone) {
            const fetchAvailability = async () => {
                setLoading(true);
                try {
                    const data = await api.getAvailability(selectedZone);
                    setAvailability(data);
                    setSelectedDateIndex(0); // Reset to first available date
                } catch (error) {
                    console.error("Error fetching availability:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAvailability();
        }
    }, [selectedZone]);

    const handleBooking = async (date, slot) => {
        try {
            await api.createBooking({
                booking: {
                    zone_id: selectedZone,
                    session_date: date,
                    start_time: slot.start_time,
                    user_id: 1, // Reference implementation
                }
            });
            toast.success('Your session has been successfully booked!');
            // Reset to Choose Your Zone State
            setSelectedZone('');
            setAvailability([]);
            setSelectedDateIndex(0);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'A problem occurred while booking. Please try again.';
            toast.error(errorMessage);
        }
    };

    const selectedDay = availability[selectedDateIndex];

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        Coach Booking
                    </h1>
                    <p className="text-neutral-400">Select a zone and find an available time slot for your session.</p>
                </header>

                <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                    <label className="block text-sm font-medium mb-3 text-neutral-300">Choose your Zone</label>
                    <div className="relative">
                        <select
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-neutral-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:outline-none appearance-none transition-all cursor-pointer hover:bg-neutral-800"
                            value={selectedZone}
                            onChange={(e) => setSelectedZone(e.target.value)}
                        >
                            <option value="" disabled>Select a zone to see availability...</option>
                            {Array.isArray(zones) && zones.map(zone => (
                                <option key={zone.id} value={zone.id}>{zone.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </section>

                {loading && (
                    <div className="flex justify-center p-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {availability.length > 0 && !loading && (
                    <div className="space-y-6">
                        {/* Tabs for Dates */}
                        <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                            {availability.map((day, index) => {
                                const dateObj = new Date(day.date);
                                return (
                                    <button
                                        key={day.date}
                                        onClick={() => setSelectedDateIndex(index)}
                                        className={cn(
                                            "flex flex-col items-center min-w-[100px] p-3 rounded-xl border transition-all shrink-0",
                                            selectedDateIndex === index
                                                ? "bg-blue-600/20 border-blue-500 text-blue-400"
                                                : "bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-400"
                                        )}
                                    >
                                        <span className="text-xs uppercase font-medium">{dateObj.toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                        <span className="text-lg font-bold">{dateObj.getDate()}</span>
                                        <span className="text-xs">{dateObj.toLocaleDateString(undefined, { month: 'short' })}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Slots for Selected Date */}
                        {selectedDay && (
                            <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="bg-neutral-800/50 p-4 border-b border-neutral-800">
                                    <h3 className="font-semibold text-lg">
                                        {new Date(selectedDay.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </h3>
                                </div>
                                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {selectedDay.slots.map((slot) => (
                                        <button
                                            key={`${selectedDay.date}-${slot.start_time}`}
                                            onClick={() => handleBooking(selectedDay.date, slot)}
                                            className="group relative p-3 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-blue-500/50 hover:bg-neutral-800 transition-all text-sm text-left"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span>{slot.start_time} - {slot.end_time}</span>
                                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 font-bold">Book</span>
                                            </div>
                                        </button>
                                    ))}
                                    {selectedDay.slots.length === 0 && (
                                        <div className="col-span-full py-8 text-center text-neutral-500">
                                            No slots available for this day.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {!loading && selectedZone && availability.length === 0 && (
                    <div className="text-center p-12 bg-neutral-900/50 border border-dashed border-neutral-800 rounded-2xl">
                        <p className="text-neutral-500">No available slots found for this zone in the next 7 days.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
