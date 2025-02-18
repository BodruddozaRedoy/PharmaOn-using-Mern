import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import useAxiosInstance from "../../../hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

// const categoryData = [
// 	{ name: "Electronics", value: 4500 },
// 	{ name: "Clothing", value: 3200 },
// 	{ name: "Home & Garden", value: 2800 },
// 	{ name: "Books", value: 2100 },
// 	{ name: "Sports & Outdoors", value: 1900 },
// ];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {

    const axiosSecure = useAxiosInstance();
  const { data: payments = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  // console.log(payments);

  const totalSales = (payments?.reduce((acc, item) => acc + item.price, 0));
  const filteredPending = payments.filter((prev) => prev.status === "pending");
  const filteredPaid = payments.filter((prev) => prev.status !== "pending");
  const pendingSales = filteredPending?.reduce(
    (acc, item) => acc + item.price,
    0
  );
  const paidSales = filteredPaid?.reduce((acc, item) => acc + item.price, 0);
  const categoryData = [
    {name: "Paid Sales ", value:paidSales},
    {name: "Pending Sales", value: pendingSales},
    {name: "Total Sales", value: totalSales}
  ]
	return (
		<motion.div
			className='bg-white mt-5 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-lg font-medium mb-4 text-black'>Overview</h2>
			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<PieChart>
						<Pie
							data={categoryData}
							cx={"50%"}
							cy={"50%"}
							labelLine={false}
							outerRadius={80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{categoryData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default CategoryDistributionChart;
