import colors from 'colors';

const tableSeeder = async (name: string, seederFunction: Function) => {
    console.log(colors.blue(`[Running] ${name} Seeder...`));
    try {
        seederFunction();
    } catch (error: any) {
        console.log(colors.green(`[Error] @ ${name} Seeder: ${error.toString()}`));
        process.exit(0);
    }
    console.log(colors.green(`[Success] ${name} Seeder...`));
}

export default tableSeeder;
