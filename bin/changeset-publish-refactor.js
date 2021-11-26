// Temporary install of https://github.com/atlassian/changesets/pull/674
// atlassian/changesets#head=publish-refactor&workspace=@changesets/cli

const hackChangetsetsDir = process.env.HACK_CHANGESET_DIR;
const skipCloneRepo = process.env.SKIP_CLONE_CHANGESET_REPO === '1';

const pathToRepo = hackChangetsetsDir ? hackChangetsetsDir : path.join(execEnv.tempDir, 'changesets');
const pathToArchive = path.join(execEnv.tempDir, 'archive.tgz');
const pathToSubpackage = path.join(pathToRepo, 'packages/cli');

if (!skipCloneRepo) {
  child_process.execFileSync(`git`, [
    `clone`,
    `-b`,
    `publish-refactor`,
    `git@github.com:atlassian/changesets.git`,
    pathToRepo,
  ]);
}

child_process.execFileSync(`yarn`, [`install`], { cwd: pathToRepo });
child_process.execFileSync(`yarn`, [`build`], { cwd: pathToRepo });

child_process.execFileSync(`yarn`, [`pack`, `--out`, pathToArchive], { cwd: pathToSubpackage });

// Send the package content into the build directory
child_process.execFileSync(`tar`, [`-x`, `-z`, `--strip-components=1`, `-f`, pathToArchive, `-C`, execEnv.buildDir]);
