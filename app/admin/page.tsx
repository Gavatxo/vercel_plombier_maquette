import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { CalendarCheck, FileText, Images, TrendingUp } from "lucide-react";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Quote from "@/models/Quote";
import Realisation from "@/models/Realisation";

async function getStats() {
  try {
    await dbConnect();

    const [appointmentsCount, quotesCount, realisationsCount, recentAppointments] = await Promise.all([
      Appointment.countDocuments({}),
      Quote.countDocuments({}),
      Realisation.countDocuments({ published: true }),
      Appointment.find({}).sort({ created_at: -1 }).limit(5).lean(),
    ]);

    return {
      appointmentsCount,
      quotesCount,
      realisationsCount,
      recentAppointments,
    };
  } catch (error) {
    return {
      appointmentsCount: 0,
      quotesCount: 0,
      realisationsCount: 0,
      recentAppointments: [],
    };
  }
}

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const stats = await getStats();

  const statCards = [
    {
      title: "Rendez-vous",
      value: stats.appointmentsCount,
      icon: CalendarCheck,
      color: "bg-blue-500",
    },
    {
      title: "Demandes de devis",
      value: stats.quotesCount,
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Réalisations publiées",
      value: stats.realisationsCount,
      icon: Images,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Bienvenue, {session.user.name || "Administrateur"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-slate-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Derniers rendez-vous</h2>
        </div>
        <div className="p-6">
          {stats.recentAppointments.length > 0 ? (
            <div className="space-y-4">
              {stats.recentAppointments.map((appointment: any) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {appointment.client_name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {appointment.intervention_type} - {appointment.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {appointment.preferred_date}
                    </p>
                    <p className="text-xs text-slate-500">
                      {appointment.preferred_time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">
              Aucun rendez-vous pour le moment
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
