import getStatus , {computeAverage, EnrollmentStatus} from "./gradeUtils.js"

const enrollees = [
 { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
 { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
 { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
 { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
 { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];
interface Enrollee {
    name: string;
    prelim: number;
    midterm: number;
    final: number;
}

interface EligibilityReport {
    name: string;
    average: number;
    status: EnrollmentStatus;
    remarks?: string;
}

function getEnrollees(): Promise<Enrollee[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(enrollees);
		}, 3000);
	});
};

function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
	const groups: Record<string, T[]> = {};
	for (let i = 0; i < items.length; i++) {
		const key = keyFn(items[i]!);
        if (!groups[key]) {
            groups[key] = [];
        }
		groups[key].push(items[i]!);
	}
	return groups;
}

async function main() {
	try{

		let batchId: string | number = 2026;

		if (typeof batchId === "string") {
			console.log(`batchId: ${batchId}`);
		} else {
			console.log(`batchId NO: ${batchId}`);
		}

		const enrollees = await getEnrollees();

		const result : EligibilityReport[] = enrollees.map(({name, prelim, midterm, final}) => {
			const average = computeAverage(prelim, midterm, final);
			const status = getStatus(average);
			return { name, average, status, remarks: status === EnrollmentStatus.Probation ? "Needs consultation" : "" };
		});

		const grouped = groupBy(result, ({status}) => {
			return status === EnrollmentStatus.Passing ? "Passing" : "Probation";
		});

		const passing = grouped["Passing"] ?? [];
		const probation = grouped["Probation"] ?? [];
		const class_average = result.reduce((sum, average) => sum + average.average , 0) / result.length;

		console.log(`=== IT313 Enrollment Eligibility Report ===`);
		for (var i = 0; i < result.length; i++) {
			console.log(`${result[i].name} - Average: ${result[i].average.toFixed(2)} - ${result[i].status === EnrollmentStatus.Passing ? "PASSING":"PROBATION"} - ${result[i].remarks}`);
		}
		console.log(`Class Average: ${class_average.toFixed(2)}`);
		console.log(`Passing: ${passing.length} / ${result.length}`);

	} catch(e){
		console.log(`Error: ${e}`);
	}
}

main();
