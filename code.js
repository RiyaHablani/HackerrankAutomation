module.exports = {
    answers: [
          `#include <iostream>
#include <vector>

using namespace std;

int simpleArraySum(vector<int> ar) {
    int sum = 0;
    for (int i = 0; i < ar.size(); i++) {
        sum += ar[i];
    }
    return sum;
}

int main() {
    int ar_count;
    cin >> ar_count;

    vector<int> ar(ar_count);

    for (int i = 0; i < ar_count; i++) {
        cin >> ar[i];
    }

    int result = simpleArraySum(ar);

    cout << result << endl;

    return 0;

}`
    ]
};
