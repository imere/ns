function Batcher () {

  this.reset();

}

Batcher.prototype = {
  flush () {

    for (const job of this.queue) {

      job.run();

    }

    this.reset();

  },
  push (job) {

    const { id } = job;

    if (!this.has[id]) {

      this.queue.push(job);
      this.has[id] = true;
      if (!this.waiting) {

        this.waiting = true;

        Promise.resolve().then(() => {

          this.flush();

        });

      }

    }

  },
  reset () {

    this.has = {};
    this.queue = [];
    this.waiting = false;

  }
};

const batcher = new Batcher();

export function queueWatcher (wt) {

  batcher.push(wt);

}
