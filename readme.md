## wizaro 🦥

In this exercise it was intended to create an array with about 1 billion elements.

For that, the distribution of the filling of the due array was made.

When all the processing was done by only one thread, it took much longer, because this single thread was responsible for filling the entire array with integers.

However, by dividing the work by the various threads existing in the cpu, it was possible to cut its execution time by just over half.

Threads  | Time
------ | -------
1  | 3.854
8  | 2.285

```
A 53.6% increase in performance.
```
