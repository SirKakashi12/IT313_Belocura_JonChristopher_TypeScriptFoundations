# Step 1 Git clone your Lab 2 

## remove/delete  .git and README.md from lab 2

<img width="1447" height="240" alt="image" src="https://github.com/user-attachments/assets/4586f448-9fcf-4fc0-bbf7-3595b2d88e62" />


# Step 2  add a tsconfig.json

Configure the project for TypeScript: add a tsconfig.json (npx tsc --init is fine) with "strict": true
enabled, and use .ts file extensions for every source file.

# Step 3 Define EnrollmentStatus  Enum

Define an EnrollmentStatus enum with members Passing and Probation, and use it — not a plain
string — everywhere a status is stored or compared.

gradeUtils.js
```typescript
export enum EnrollmentStatus {
    Passing, 
    Probation
}
```

# Step 4 Define 2 Interface

```typescript
interface Enrollee {
    name: string;
     prelim: number;
     midterm: number;
     final: number;
} 
interface EligibilityReport {
    name: string;
    average: number;
     status:EnrollmentStatus;
     remarks?: string;
} 
```
# Step 5  Create module file   rename both main and gradeUtils   INTO  .ts extentions

Create a separate module file (e.g., gradeUtils.ts) that exports a named function
computeAverage(prelim: number, midterm: number, final: number): number and a default
function getStatus(average: number): EnrollmentStatus, both fully typed, then import both into
your main script using ES module import/export syntax.

<img width="148" height="100" alt="image" src="https://github.com/user-attachments/assets/d20c4c62-71d1-4cc2-beb9-738f3a6dbdd5" />

# Step 6  Remake  function getEnrollees():


Write a function getEnrollees(): Promise<Enrollee[]> that resolves with the enrollees array after a
short delay (e.g., using setTimeout), simulating a call to a registrar API, and an async function
that awaits it inside a try/catch block so a failed "connection" is caught and reported instead of
crashing the program.


```typescript
function getEnrollees(): Promise<Enrollee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 3000);
    });
};

```

# Step 7  Use a union type   | 

Use a union type (e.g., let batchId: string | number;) somewhere meaningful in your program —
for example, a batch or request ID that can come back as either a string or a number from the
"API" — and show TypeScript narrowing it (e.g., with a typeof check) before you use it. 


```typescript
    let batchId: string | number;

    if (typeof batchId === "String") {
        console.log(`Batch ID: ${batchId}`);
    } else {
        console.log(`Batch ID No: ${batchId}`);
    }
```

# Step 8 generic function 

Write one generic function — for example, function groupBy<T>(items: T[], keyFn: (item: T) =>
string): Record<string, T[]> — and use it to group your typed report entries by status, in place of
or alongside .filter().


```typescript
function groupBy<T>(items: T[], keyFn: (item: T) =>string): Record<string, T[]> {
    const groups: Record<string, T[]>
    for (let i = 0; i < items.length; i++) {
        const key = keyFn(items[i]!);

        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(items[i]!);
    }
    return groups;
}
```

## Change Filter
```typescript
const grouped = groupBy(result,({status}) => {
    return status === EnrollmentStatus.passing ? "PASSING": "PROBATION": 
} );

const passing = grouped["PASSING"] ?? [];
const probation = grouped["PROBATION"] ?? []; 
```


# Step 9 

Use .map(), together with your imported computeAverage() and getStatus(), to build a typed array
of EligibilityReport objects; use .reduce() to compute the class average; use template literals to
print the formatted report shown above.

and

# Step 10
Run npx tsc --noEmit with zero type errors before your recording is considered complete.

```typescript
const result:EligibilityReport[] = enrollees.map(({name, prelim, midterm, final}) => {
        const average = computeAverage(prelim, midterm, final);
        const status = getStatus(average);
        return { name, average, status, remarks: status ? "Needs consultation": "" };
});
```

##  system log / Out put

```typescript
        console.log(`=== IT313 Enrollment Eligibility Report (TypeScript) ===`);
        for (var i = 0; i < result.length; i++) {
            console.log(`${result[i].name} - Average: ${result[i].average.toFixed(2)} - ${result[i].status === EnrollmentStatus.Passing ? "PASSING":"PROBATION"} - ${result[i].remarks}`);
        }
        console.log(`Class Average: ${class_average.toFixed(2)}`);
        console.log(`Passing: ${passing.length} / ${result.length}`);
```

<img width="1024" height="292" alt="image" src="https://github.com/user-attachments/assets/119b7368-a2c0-4333-a970-00a4c7d6bc8c" />



# Step 11 Commit and Push while creating  README.md 


 Creating a Include a README.md in your project explaining the problem, the TypeScript concepts you
applied and why, and how to run gradeUtils.ts and your main script (e.g., with ts-node).
