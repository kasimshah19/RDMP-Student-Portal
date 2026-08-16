import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getTimetable } from '../../services/studentService';
import { useToast } from '../../context/ToastContext';

const TimeTable = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const res = await getTimetable();
                if (res.success) {
                    setTimetable(res.data);
                }
            } catch (err) {
                addToast("Failed to fetch timetable", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchTimetable();
    }, []);

    const DayColumn = ({ dayObj }) => {
        return (
            <div className="flex flex-col min-w-[280px] w-full snap-center">
                <div className="bg-[var(--navy)] text-white p-3 rounded-t-lg font-bold text-center">
                    {dayObj.day}
                </div>
                <div className="bg-[var(--cloud)] border border-mist border-t-0 p-3 rounded-b-lg flex flex-col gap-3 min-h-[400px]">
                    {dayObj.classes.map((c, idx) => (
                        <div
                            key={idx}
                            className={`p-3 rounded-lg border flex flex-col gap-2 ${c.type === 'Break' || c.type === 'Lunch'
                                    ? 'bg-amber-50 border-amber-200 justify-center items-center py-4'
                                    : 'bg-white border-mist shadow-sm hover:border-[var(--brass)] transition-colors'
                                }`}
                        >
                            {(c.type === 'Break' || c.type === 'Lunch') ? (
                                <div className="text-amber-700 font-semibold uppercase text-xs tracking-wider flex items-center gap-2">
                                    <Clock size={14} />
                                    {c.time} • {c.type}
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-bold text-[var(--ink)] text-[15px] leading-tight">
                                            {c.subject}
                                        </h4>
                                        <span className="sdp-badge bg-[var(--info-soft)] text-xs font-semibold px-2" style={{ color: 'var(--info-text)' }}>
                                            {c.type}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 mt-1">
                                        <div className="flex items-center gap-1.5 text-xs text-[var(--slate)] font-medium">
                                            <Clock size={13} />
                                            {c.time}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-[var(--slate)] font-medium">
                                            <MapPin size={13} />
                                            {c.room}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                    Time Table
                </h1>
                <p className="text-sm font-medium mt-1 text-[var(--slate)]">
                    View your weekly academic schedule
                </p>
            </div>

            <div className="flex-1 w-full relative">
                {loading ? (
                    <div className="flex h-full w-full justify-center items-center py-20 bg-white rounded-xl shadow-sm border border-mist">
                        <Loader />
                    </div>
                ) : timetable.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-mist">
                        <EmptyState
                            title="No schedule built"
                            description="The timetable for your class division has not been generated yet."
                            icon={Calendar}
                        />
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar">
                        {timetable.map((t, idx) => <DayColumn key={idx} dayObj={t} />)}
                    </div>
                )}
            </div>
        </main>
    );
};

export default TimeTable;
